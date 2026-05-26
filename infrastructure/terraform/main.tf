terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_s3_bucket" "assets" {
  bucket = var.assets_bucket_name
}

resource "aws_ecr_repository" "web" {
  name = "buildforge-web"
}

resource "aws_ecr_repository" "api" {
  name = "buildforge-api"
}

resource "aws_ecr_repository" "worker" {
  name = "buildforge-worker"
}
