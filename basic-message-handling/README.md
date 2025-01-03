# Message handling

This folders represensts handling messages via serverless function and saving its content to storage.

## Resources

All resources are serverless - thus does not need to be privded and configured step by step. CloudFormation will be enough.

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

## How I made it

As starting point I tried to make it manually and gradually add new resources to CloudFormation template.

Also I was aiding myself with:

* [CloudFormation Template docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-snippets.html)
