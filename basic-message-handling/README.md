# Message handling

This folders represensts handling messages via serverless function and saving its content to storage.

## Resources

* SNS
* Lambda
* S3 bucket
* IAM policies
* CloudFormation
* CloudWatch

## Deep dive

Infrastructure of this excercise is craeted via CloudFormation - IAM roles are need to be provided as starting point (or use Terraform to make similar resources in one go).

SNS gathers messages > CloudWatch fires alarm > EventBridge envokes Lambda > Lambda saves message content to S3

To make this possible all resources should have correct IAM roles and boundaries
