variable "secret_id" {
  type = string
}

variable "secret_key" {
  type = string
}

variable "region" {
  type = string
}

variable "app_name" {
  type = string
}

variable "container_port" {
  type = number
}

variable "vpc_id" {
  type = string
}

variable "health_check_endpoint" {
  type    = string
  default = "/healthz"
}

variable "health_check_matcher" {
  type    = string
  default = "200"
}

variable "alb_certificate" {
  type = string
}

variable "fargate_service_min_capacity" {
  type    = number
  default = 1
}

variable "fargate_service_max_capacity" {
  type    = number
  default = 4
}

variable "fargate_service_cpu" {
  type    = number
  default = 1024
}

variable "fargate_service_memory" {
  type    = number
  default = 2048
}

variable "cluster_name" {
  type = string
}

variable "subnets" {
  type = list(string)
}

variable "github_token" {
  type = string
}

variable "github_repo" {
  type = string
}

variable "github_organization" {
  type = string
}

variable "prefix" {
  type = string
}

variable "database_instance_class" {
  type    = string
  default = "db.t3.micro"
}

variable "database_storage" {
  type    = number
  default = 20
}

variable "database_name" {
  type    = string
  default = "postgres"
}

variable "database_username" {
  type    = string
  default = "postgres"
}

variable "database_password" {
  type = string
}
