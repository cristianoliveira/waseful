resource "aws_ecr_repository" "ecr_repo" {
  name = var.aws_ecr_repo_name
}

resource "aws_iam_role" "ecr_role" {
  name = "${var.aws_ecr_repo_name}-role"
  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Action" : "sts:AssumeRole",
        "Principal" : {
          "Service" : ["ec2.amazonaws.com"]
        },
        "Effect" : "Allow",
      }
    ]
  })
}

resource "aws_iam_policy" "ecr_policy" {
  name        = "${var.aws_ecr_repo_name}-policy"
  description = "Policy for ECR"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Action" : [
          "ecr:GetAuthorizationToken",
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:GetRepositoryPolicy",
          "ecr:DescribeRepositories",
          "ecr:ListImages",
          "ecr:DescribeImages",
          "ecr:BatchGetImage"
        ],
        "Effect" : "Allow",
        "Resource" : "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecr_policy_attachment" {
  role       = aws_iam_role.ecr_role.name
  policy_arn = aws_iam_policy.ecr_policy.arn
}

resource "aws_iam_instance_profile" "ecr_profile" {
  name = "${var.aws_ecr_repo_name}-profile"
  role = aws_iam_role.ecr_role.name
}
