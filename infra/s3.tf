resource "aws_s3_bucket" "assets_bucket" {
  bucket = var.app_domain_name

  tags = {
    Name = "assets_${var.app_domain_name}"
  }
}

# S3 aws_s3_bucket_website_configuration
resource "aws_s3_bucket_website_configuration" "assets_bucket_website" {
  bucket = aws_s3_bucket.assets_bucket.id
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "404.html"
  }
}

# S3 allow public access
resource "aws_s3_bucket_public_access_block" "assets_bucket_public_access" {
  bucket                  = aws_s3_bucket.assets_bucket.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# S3 bucket policy
#
# "AWS": "${var.aws_iam_user_arn}"
resource "aws_s3_bucket_policy" "assets_bucket_policy" {
  bucket = aws_s3_bucket.assets_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "CloudFront OAI S3 bucket access"
        Effect    = "Allow"
        Principal = { AWS = "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity ${aws_cloudfront_origin_access_identity.cf_s3_oai.id}" }
        Action    = "s3:GetObject"
        Resource  = [
          "arn:aws:s3:::${var.app_domain_name}/*"
        ]
      },
    ]
  })
}

# S3 bucket cors
resource "aws_s3_bucket_cors_configuration" "assets_bucket_cors" {
  bucket = aws_s3_bucket.assets_bucket.id
  cors_rule {
    allowed_headers = ["Authorization", "Content-Length"]
    allowed_methods = ["GET", "POST"]
    allowed_origins = ["*"]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_ownership_controls" "assets_bucket_acl_ownership" {
  bucket = aws_s3_bucket.assets_bucket.id
  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

data "local_file" "sdk_js" {
  filename = "assets/dist/sdk.js"
}

# Upload sdk.js to the S3 bucket
resource "aws_s3_object" "sdk_object" {
  bucket = aws_s3_bucket.assets_bucket.id # Reference to the S3 bucket
  key    = "v1/sdk.js"                   # File name in the bucket
  content_type = "application/javascript"
  content = data.local_file.sdk_js.content
}
