function Backup-Contents {
    $backupDir = "./Backups"
    $timestamp = (Get-Date -Format 'yyyy-MM-dd_HH-mm-ss')
    $backupFolder = "$backupDir\$timestamp"

    if (-not (Test-Path -Path $backupFolder)) {
        New-Item -Path $backupFolder -ItemType Directory
    }

    Copy-Item -Path .\* -Destination $backupFolder -Recurse -Force
}

Backup-Contents

$commitMessage = "Auto commit: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

git add .
git commit -m "$commitMessage"
git pull
