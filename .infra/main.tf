terraform {
  backend "remote" {
    organization = "moonshot-partners"

    workspaces {
      prefix = "sunrise-"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }

    github = {
      source  = "integrations/github"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region     = var.region
  access_key = var.secret_id
  secret_key = var.secret_key
}

provider "github" {
  token = var.github_token
  owner = var.github_organization
}
