# Waseful

This is a self-hosted solution for collection feedback from your users in a
simple way.

## Running

```bash
npm i
npm run test
npm run build
```

And then run the individual workspaces

```bash
npm run sdk:serve
```

Run the API on docker

```bash
npm run dc:up
```

As an alternative, first set up your database and set in `apps/api/.env` then

```bash
npm run api:db:migrate
npm run api:serve
```

## See more

- [API](https://github.com/cristianoliveira/waseful/tree/main/apps/api#waseful-api)
- [SDK](https://github.com/cristianoliveira/waseful/tree/main/libs/sdk#waseful-sdk)
- [Infra](https://github.com/cristianoliveira/waseful/tree/main/infra#waseful-infra)

## Deploying

Deploy your own instance of Waseful to AWS.

See: `infra/terraform.tfvars-example`

- Create an account in AWS
- Obtain your AWS credentials `aws_access_key` & `aws_secret_key`
- To deploy create your ECR repository `aws_ecr_url` & `aws_ecr_repo_name`
- Configure the database, we use [Prisma](https://www.prisma.io/) for simplicity `app_db_url`
- Create a new user on IAM and set in `aws_iam_user_arn` the user must contain
  access to ECR, EC2, ECS, Route53, S3, Certificate Manager, and CloudFront.
