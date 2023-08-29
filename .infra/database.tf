resource "aws_security_group" "rds_security_group" {
  name   = "${var.app_name}-rds-sg"
  vpc_id = var.vpc_id

  ingress {
    description = "Access to RDS Port"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

module "rds" {
  source  = "terraform-aws-modules/rds/aws"
  version = "3.4.1"

  identifier = "${var.app_name}-rds"

  create_db_option_group    = false
  create_db_parameter_group = false

  engine               = "postgres"
  engine_version       = "13"
  family               = "postgres13" # DB parameter group
  major_engine_version = "13"         # DB option group
  instance_class       = var.database_instance_class

  allocated_storage      = var.database_storage
  name                   = var.database_name
  username               = var.database_username
  password               = var.database_password
  create_random_password = false
  port                   = 5432

  subnet_ids             = var.subnets
  vpc_security_group_ids = [aws_security_group.rds_security_group.id]

  maintenance_window = "Sun:00:00-Sun:03:00"
  backup_window      = "03:00-06:00"

  backup_retention_period = 7

}