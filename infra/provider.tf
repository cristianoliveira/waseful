terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
    }
  }
}

terraform {
  cloud {
    organization = "cristianoliveiradev"

    workspaces {
      name = "waseful-api"
    }
  }
}

provider "aws" {
  region  = "us-west-2"
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
}
