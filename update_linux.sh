#!/bin/bash

backup_contents() {
    BACKUP_DIR="./Backups"

    mkdir -p "$BACKUP_DIR"
    cp -r ./* "$BACKUP_DIR/"
}

backup_contents

COMMIT_MESSAGE="Auto commit: $(date +"%Y-%m-%d %H:%M:%S")"

git add .
git commit -m "$COMMIT_MESSAGE"
git pull --rebase
