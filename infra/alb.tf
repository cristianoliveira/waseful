resource "aws_lb" "alb" {
  name               = "webapp-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [module.webapp_sg.security_group_id]
  subnets            = module.main_vpc.public_subnets

  enable_deletion_protection = false

  tags = {
    Name = "webapp-alb"
  }
}

resource "aws_lb_target_group" "target_group" {
  name     = "webapp-target-group"
  port     = 8080
  protocol = "HTTP"
  vpc_id   = module.main_vpc.vpc_id

  health_check {
    enabled             = true
    interval            = 30
    path                = "/feedbacks"
    port                = "8080"
    timeout             = 3
    healthy_threshold   = 3
    unhealthy_threshold = 3
    matcher             = "200"
  }
}

resource "aws_lb_listener" "listener" {
  load_balancer_arn = aws_lb.alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.target_group.arn
  }
}

resource "aws_lb_target_group_attachment" "attachment" {
  target_group_arn = aws_lb_target_group.target_group.arn
  target_id        = aws_instance.api_ins.id
  port             = 8080
}

resource "aws_lb_target_group_attachment" "attachment_b" {
  target_group_arn = aws_lb_target_group.target_group.arn
  target_id        = aws_instance.api_ins_b.id
  port             = 8080
}

module "main_vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "webapp-dev-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["us-west-2a", "us-west-2b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway = true

  tags = {
    Terraform = "true"
    Environment = "dev"
  }
}

