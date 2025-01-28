# AWS Infrastructure as Code Assessment

This folder contains an AWS CloudFormation implementation of a infrastructure setup demonstrating IaC (Infrastructure as Code) practices.

## Infrastructure Components

- Private VPC with networking setup
- Application Load Balancer (public-facing)
- AWS Lambda function
- S3 Storage
- AWS Secrets Manager
- IAM roles and permissions

## Architecture Overview

The infrastructure follows a secure design where:

- Only the Load Balancer is publicly accessible
- All other resources are in private subnets
- Lambda function communicates with S3 and Secrets Manager through private networking
- IAM permissions are configured following least privilege principle

## Function Capabilities

The Lambda function demonstrates:

1. Retrieving secrets from AWS Secrets Manager
2. Listing files from the S3 bucket
3. Responding to requests through the Load Balancer

## Deployment

Deployment is handled via AWS CLI using CloudFormation templates:

```sh
aws configure

aws cloudformation deploy \
  --template-file file://main.yaml \
  --stack-name assessment-stack

aws cloudformation deploy \
  --template-file main.yaml \
  --stack-name STACK_NAME \
  --capabilities CAPABILITY_IAM
```
