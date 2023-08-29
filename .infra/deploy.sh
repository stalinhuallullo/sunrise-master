# #!/bin/bash
# set -e

# in order to run this script you have to set up these environment variables:

# APP_TASK
# APP_ECR_AUTH
# APP_ECR
# CODE_DEPLOY_S3
# CODEDEPLOY_APP_NAME
# CODEDEPLOY_GROUP_NAME
# POSTGRESQL_URL


# Prepare deploy

export NEW_VERSION_LABEL=$(date +%s)
export APP_ECR_LABEL="$APP_ECR:$NEW_VERSION_LABEL"

# inject fargate environment variables

echo $APP_ENVS | envsubst > variables.json

# Docker deploy new verison
cd ..

aws ecr get-login-password | docker login --username AWS --password-stdin $APP_ECR_AUTH
docker build -t app -f Dockerfile.prod .
docker tag app:latest $APP_ECR_LABEL
docker push $APP_ECR_LABEL

cd .infra

# Update Task

TASK_DEFINITION=$(aws ecs describe-task-definition --task-definition $APP_TASK)
ENVIRONMENT_VARIABLES=$(cat variables.json | jq)
echo $TASK_DEFINITION | jq '.taskDefinition' | jq ".containerDefinitions[0].image=\"$APP_ECR_LABEL\"" | jq ".containerDefinitions[0].environment = $ENVIRONMENT_VARIABLES" > task-def.json
echo $(cat task-def.json | jq 'del(.status) | del(.taskDefinitionArn) | del(.revision) | del(.requiresAttributes) | del(.compatibilities) | del(.registeredAt) | del(.registeredBy)') > updated-task-definition.json
TASK_NEW_REVISION=$(aws ecs register-task-definition --family $APP_TASK --cli-input-json file://updated-task-definition.json | jq ".taskDefinition.taskDefinitionArn")

# prepare deployment files for CodeDeploy blue-green workflow
echo $(cat task.json | jq ".Resources[0].TargetService.Properties.TaskDefinition = $TASK_NEW_REVISION" | jq ".Resources[0].TargetService.Properties.LoadBalancerInfo.ContainerPort = $container_port") > task.json
echo $(cat deployment.json | jq ".applicationName = \"$CODEDEPLOY_APP_NAME\"" | jq ".deploymentGroupName = \"$CODEDEPLOY_GROUP_NAME\"" | jq ".revision.s3Location.bucket = \"$CODE_DEPLOY_S3\"") > deployment.json

# deploy new version

aws s3 cp task.json s3://$CODE_DEPLOY_S3/task.json
aws deploy create-deployment --cli-input-json file://deployment.json
