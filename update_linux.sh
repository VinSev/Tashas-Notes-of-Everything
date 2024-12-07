#!/bin/bash

backup_contents() {
    BACKUP_DIR="./Backups"
    TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
    BACKUP_FOLDER="$BACKUP_DIR/$TIMESTAMP"

    mkdir -p "$BACKUP_FOLDER"
    cp -r ./* "$BACKUP_FOLDER/"
}

backup_contents

COMMIT_MESSAGE="Auto commit: $(date +"%Y-%m-%d %H:%M:%S")"

git add .
git commit -m "$COMMIT_MESSAGE"
git pull --rebase
