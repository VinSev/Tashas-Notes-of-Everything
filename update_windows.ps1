function Backup-Contents {
    $backupDir = "./Backups"

    if (-not (Test-Path -Path $backupDir)) {
        New-Item -Path $backupDir -ItemType Directory
    }

    Copy-Item -Path .\* -Destination $backupDir -Recurse -Force
}

Backup-Contents

$commitMessage = "Auto commit: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

git add .
git commit -m "$commitMessage"
git pull --rebase
