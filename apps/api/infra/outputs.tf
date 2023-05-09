output "instance_dns" {
  value = [for public_dns in [
    aws_instance.api_ins.public_dns,
  ] : public_dns]
}

output "instance_id" {
  value = [for id in [
    aws_instance.api_ins.id,
  ] : id]
}

output "aws_ecr_url" {
  value = aws_ecr_repository.ecr_repo.repository_url
}
