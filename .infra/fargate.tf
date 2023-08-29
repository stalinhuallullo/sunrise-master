module "fargate-service-blue-green" {
  source  = "app.terraform.io/moonshot-partners/fargate-service-blue-green/aws"
  version = "1.0.2"
  # insert required variables here

  app_name                     = var.app_name
  container_port               = var.container_port
  vpc_id                       = var.vpc_id
  health_check_endpoint        = var.health_check_endpoint
  health_check_matcher         = var.health_check_matcher
  alb_certificate              = var.alb_certificate
  fargate_service_min_capacity = var.fargate_service_min_capacity
  fargate_service_max_capacity = var.fargate_service_max_capacity
  fargate_service_cpu          = var.fargate_service_cpu
  fargate_service_memory       = var.fargate_service_memory
  app_region                   = var.region
  cluster_name                 = var.cluster_name
  subnets                      = var.subnets
}
