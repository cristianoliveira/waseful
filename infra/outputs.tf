output "dns" {
  value = aws_lb.alb.dns_name
}

output "aws_ecr_url" {
  value = aws_ecr_repository.ecr_repo.repository_url
}

output "aws_cloudfront_domain_name" {
  value = aws_cloudfront_distribution.sdk_distribution.domain_name
}
