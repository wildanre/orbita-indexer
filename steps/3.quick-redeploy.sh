#!/bin/bash
# Quick redeploy - hanya upload env dan restart (tanpa rebuild)
# Login: ssh senja-idcloud -p 69
set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Configuration
SSH_HOST="senja-idcloud"
SSH_PORT="69"
REMOTE_PATH="~/apps/senja-indexer"
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

SSH_CMD="ssh -p $SSH_PORT $SSH_HOST"
SCP_CMD="scp -P $SSH_PORT"

echo -e "${GREEN}[INFO]${NC} ⚡ Quick redeploying to VPS..."

# Upload .env
echo -e "${GREEN}[INFO]${NC} Uploading .env.local..."
$SCP_CMD "$PROJECT_DIR/.env.local" "$SSH_HOST:$REMOTE_PATH/.env"

# Restart
echo -e "${GREEN}[INFO]${NC} Restarting application..."
$SSH_CMD "cd $REMOTE_PATH && sudo docker compose down && sudo docker compose up -d"

echo -e "${GREEN}[INFO]${NC} ✓ Quick redeploy complete!"
echo -e "${GREEN}[INFO]${NC} View logs: ssh senja-idcloud -p 69 'cd $REMOTE_PATH && sudo docker compose logs -f'"
