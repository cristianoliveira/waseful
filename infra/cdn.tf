resource "aws_cloudfront_origin_access_identity" "cf_s3_oai" {
  comment = "OAI for SDK bucket"
}

resource "aws_cloudfront_distribution" "sdk_distribution" {
  origin {
    domain_name = aws_s3_bucket.assets_bucket.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.assets_bucket.id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.cf_s3_oai.cloudfront_access_identity_path
    }
  }

  enabled            = true
  is_ipv6_enabled    = true
  comment            = "SDK distribution"

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = aws_s3_bucket.assets_bucket.id

    forwarded_values {
      query_string = false
      headers      = ["Origin"]

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000

    compress               = true
  }
}
