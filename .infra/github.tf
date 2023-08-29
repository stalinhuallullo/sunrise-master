data "github_repository" "default" {
  full_name = "${var.github_organization}/${var.github_repo}"
}

resource "github_actions_secret" "ecr_registry_id" {
  repository      = data.github_repository.default.name
  secret_name     = "${var.prefix}_ecr_registry_id"
  plaintext_value = module.fargate-service-blue-green.ecr_registry_id
}

resource "github_actions_secret" "ecr_repository_url" {
  repository      = data.github_repository.default.name
  secret_name     = "${var.prefix}_ecr_repository_url"
  plaintext_value = module.fargate-service-blue-green.ecr_repository_url
}

resource "github_actions_secret" "ecr_repo_auth" {
  repository      = data.github_repository.default.name
  secret_name     = "${var.prefix}_ecr_repo_auth"
  plaintext_value = module.fargate-service-blue-green.ecr_repo_auth
}

resource "github_actions_secret" "ecr_repo_name" {
  repository      = data.github_repository.default.name
  secret_name     = "${var.prefix}_ecr_repo_name"
  plaintext_value = module.fargate-service-blue-green.ecr_repo_name
}

resource "github_actions_secret" "app_task_name" {
  repository      = data.github_repository.default.name
  secret_name     = "${var.prefix}_app_task_name"
  plaintext_value = module.fargate-service-blue-green.app_task_name
}

resource "github_actions_secret" "codedeploy_s3_name" {
  repository      = data.github_repository.default.name
  secret_name     = "${var.prefix}_codedeploy_s3_name"
  plaintext_value = module.fargate-service-blue-green.codedeploy_s3_name
}

resource "github_actions_secret" "codedeploy_group_name" {
  repository      = data.github_repository.default.name
  secret_name     = "${var.prefix}_codedeploy_group_name"
  plaintext_value = module.fargate-service-blue-green.codedeploy_group_name
}

resource "github_actions_secret" "codedeploy_name" {
  repository      = data.github_repository.default.name
  secret_name     = "${var.prefix}_codedeploy_name"
  plaintext_value = module.fargate-service-blue-green.codedeploy_name
}

resource "github_actions_secret" "secret_id" {
  repository      = data.github_repository.default.name
  secret_name     = "${var.prefix}_aws_secret_id"
  plaintext_value = var.secret_id
}

resource "github_actions_secret" "aws_secret_key" {
  repository      = data.github_repository.default.name
  secret_name     = "${var.prefix}_aws_secret_key"
  plaintext_value = var.secret_key
}

resource "github_actions_secret" "app_region" {
  repository      = data.github_repository.default.name
  secret_name     = "${var.prefix}_app_region"
  plaintext_value = var.region
}

resource "github_actions_secret" "db_connection" {
  repository      = data.github_repository.default.name
  secret_name     = "${var.prefix}_db_connection"
  plaintext_value = "postgresql://${module.rds.db_instance_name}:${var.database_password}@${module.rds.db_instance_address}/postgres"
}
