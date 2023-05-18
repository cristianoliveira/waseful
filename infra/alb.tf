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

resource "aws_lb_target_group" "apis_tg" {
  name     = "api-target-group"
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
    target_group_arn = aws_lb_target_group.apis_tg.arn
  }
}

resource "aws_lb_target_group_attachment" "attachment" {
  target_group_arn = aws_lb_target_group.apis_tg.arn
  target_id        = aws_instance.api_ins.id
  port             = 8080
}

resource "aws_lb_target_group_attachment" "attachment_b" {
  target_group_arn = aws_lb_target_group.apis_tg.arn
  target_id        = aws_instance.api_ins_b.id
  port             = 8080
}

resource "aws_lb_listener" "https_listener" {
  load_balancer_arn = aws_lb.alb.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = "${aws_acm_certificate_validation.cert.certificate_arn}"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.apis_tg.arn
  }
}

