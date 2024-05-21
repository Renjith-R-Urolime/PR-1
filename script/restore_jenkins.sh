#!/bin/bash

# Check if the correct number of arguments is provided
if [ "$#" -ne 3 ]; then
    echo "Usage: $0 <bucket-name> <backup-file> <jenkins-home-dir>"
    exit 1
fi

# Variables
S3_BUCKET=$1
BACKUP_FILE=$2
JENKINS_HOME=$3
LOCAL_BACKUP_FILE="/opt/backup/$BACKUP_FILE"

# Download the backup file from S3
aws s3 cp s3://$S3_BUCKET/production/jenkins_backup/$BACKUP_FILE $LOCAL_BACKUP_FILE
if [ $? -ne 0 ]; then
    echo "Failed to download backup file from S3"
    exit 1
fi

# Stop Jenkins Docker container
docker-compose down
if [ $? -ne 0 ]; then
    echo "Failed to stop Jenkins Docker container"
    exit 1
fi

# Extract the backup file
sudo tar -xzvf $LOCAL_BACKUP_FILE -C $JENKINS_HOME
if [ $? -ne 0 ]; then
    echo "Failed to extract backup file"
    exit 1
fi

# Set proper permissions
sudo chown -R 1000:1000 $JENKINS_HOME
if [ $? -ne 0 ]; then
    echo "Failed to set permissions"
    exit 1
fi

# Start Jenkins Docker container
docker-compose up -d
if [ $? -ne 0 ]; then
    echo "Failed to start Jenkins Docker container"
    exit 1
fi

echo "Jenkins restore completed successfully"
