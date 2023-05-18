resource "aws_route53_zone" "youdropz" {
  name = "${var.api_domain_name}"
}

resource "aws_acm_certificate" "cert" {
  domain_name       = "${var.api_domain_name}"
  validation_method = "DNS"

  tags = {
    Name = "api-cert"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  }

  name    = each.value.name
  type    = each.value.type
  zone_id = aws_route53_zone.youdropz.zone_id
  records = [each.value.value]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "cert" {
  certificate_arn         = "${aws_acm_certificate.cert.arn}"
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}
