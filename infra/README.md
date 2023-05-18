# Waseful infra

Deploy your own instance of Waseful to AWS.

See: `infra/terraform.tfvars-example`

- Create an account in AWS
- Obtain your AWS credentials `aws_access_key` & `aws_secret_key`
- To deploy create your ECR repository `aws_ecr_url` & `aws_ecr_repo_name`
- Configure the database, we use [Prisma](https://www.prisma.io/) for simplicity `app_db_url`
- Create a new user on IAM and set in `aws_iam_user_arn` the user must contain
  access to ECR, EC2, ECS, Route53, S3, Certificate Manager, and CloudFront.
