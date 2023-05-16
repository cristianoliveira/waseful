data "aws_vpc" "webapp" {
  default = true
}

resource "aws_instance" "api_ins" {
  ami           = "ami-0fcf52bcf5db7b003" # Ubuntu 20.04 LTS // us-east-1
  instance_type = "t2.micro"
  key_name      = "webapp_key"

  vpc_security_group_ids = [module.webapp_sg.security_group_id]

  iam_instance_profile = aws_iam_instance_profile.ecr_profile.name

  user_data = templatefile("./tpls/setup.tpl.sh", {
    description   = "foo bar"
    aws_ecr_url   = var.aws_ecr_url
    aws_region    = var.aws_region
    app_image_tag = var.app_image_tag
    app_db_url    = var.app_db_url
    port          = "8080"
  })

  tags = {
    Name = "webapp"
  }
}

module "webapp_sg" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 4.0"

  name = "webapp_sg_withmodule"

  vpc_id = data.aws_vpc.webapp.id
  ingress_rules       = ["http-80-tcp", "http-8080-tcp", "ssh-tcp"]
  ingress_cidr_blocks = ["0.0.0.0/0"]

  egress_rules       = ["all-all"]
  egress_cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_key_pair" "aws_kp" {
  key_name   = "webapp_key"
  public_key = data.local_file.aws_pub_key.content
}

# In case you want to ssh to your instance
# Genetare a key pair `ssh-keygen -t ed25519 -C "mail@example"`
# inside of the `./.ssh/` folder and name it "aws"
data "local_file" "aws_pub_key" {
  filename = ".ssh/aws.pub"
}
