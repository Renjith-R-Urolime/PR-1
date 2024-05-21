
#!/bin/bash

# Variables
BACKUP_DIR="/opt/backup"
SOURCE_DIR="/var/jenkins_home"
S3_BUCKET="jenkins_backup_files"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Backup source directory
tar -cvzf $BACKUP_DIR/backup_$(date +"%Y%m%d_%H%M%S").tar.gz -C $SOURCE_DIR .

echo "Backup completed and waiting for upload to s3"

# Upload backups to S3
aws s3 cp $BACKUP_DIR s3://$S3_BUCKET/production/jenkins_backup --recursive
# Check if the upload was successful
if [ $? -eq 0 ]; then
    echo "Upload to S3 successful"
    # Clean up temporary files if upload was successful
    rm -rf $BACKUP_DIR
else
    echo "Upload to S3 failed"
    exit 1
fi
# Clean up temporary files
#rm -rf $BACKUP_DIR
