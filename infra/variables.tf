variable "instance_type" {
  description = "Type of EC2 instance to provision"
  default     = "t3.nano"
}

variable "aws_region" {
  default = "eu-west-1"
}

variable "aws_iam_user_arn" {}

variable "aws_ecr_url" {}
variable "aws_ecr_repo_name" {}
variable "aws_profile" {
  default = "personal"
}
variable "app_image_tag" {}
variable "aws_access_key" {}
variable "aws_secret_key" {}

variable "app_domain_name" {
  default = "cristianoliveira.dev"
}

variable "app_db_url" {
  sensitive = true
}
