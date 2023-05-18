module "main_vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "webapp-dev-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["us-west-2a", "us-west-2b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway = false
  single_nat_gateway = false
  one_nat_gateway_per_az = false

  tags = {
    Terraform = "true"
    Environment = "dev"
  }
}

module "webapp_sg" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 4.0"

  name = "webapp_sg_withmodule"

  vpc_id   = module.main_vpc.vpc_id
  ingress_rules = [
    "http-80-tcp",
    "http-8080-tcp",
    "https-443-tcp",
    # "ssh-tcp"
  ]
  ingress_cidr_blocks = ["0.0.0.0/0"]

  egress_rules       = ["all-all"]
  egress_cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_key_pair" "aws_kp" {
  key_name   = "api_key_pair"
  public_key = data.local_file.aws_pub_key.content
}

# In case you want to ssh to your instance
#
# Add the follow rule to main_sg module
#   ingress_rules = ["ssh-tcp"]
#
# Genetare a key pair `ssh-keygen -t ed25519 -C "mail@example"`
# inside of the `./.ssh/` folder and name it "aws"
data "local_file" "aws_pub_key" {
  filename = ".ssh/aws.pub"
}
