#!/bin/bash
# Full redeploy - upload files, rebuild, restart
# Login: ssh senja-idcloud -p 69
set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
SSH_HOST="senja-idcloud"
SSH_PORT="69"
REMOTE_PATH="~/orbita-indexer"
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

SSH_CMD="ssh -p $SSH_PORT $SSH_HOST"
SCP_CMD="scp -P $SSH_PORT"
RSYNC_SSH="ssh -p $SSH_PORT"

print_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
print_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }
print_step() { echo -e "${BLUE}[STEP]${NC} $1"; }

echo ""
print_info "🚀 Full redeployment to VPS"
echo ""

# Step 1: Upload .env.local as .env
print_step "1/5 Uploading environment configuration..."
$SCP_CMD "$PROJECT_DIR/.env.local" "$SSH_HOST:$REMOTE_PATH/.env"
print_info "✓ Environment file uploaded"
echo ""

# Step 2: Upload project files
print_step "2/5 Uploading project files..."
rsync -avz --progress --delete \
    -e "$RSYNC_SSH" \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude '.env.local' \
    --exclude '.env' \
    --exclude '.pnpm-store' \
    --exclude 'generated' \
    --exclude '.DS_Store' \
    --exclude 'steps' \
    "$PROJECT_DIR/" "$SSH_HOST:$REMOTE_PATH/"
print_info "✓ Project files uploaded"
echo ""

# Step 3: Stop running containers
print_step "3/5 Stopping running application..."
$SSH_CMD "cd $REMOTE_PATH && sudo docker compose down" || print_warn "No running containers to stop"
print_info "✓ Application stopped"
echo ""

# Step 4: Rebuild Docker image
print_step "4/5 Building Docker image..."
$SSH_CMD "cd $REMOTE_PATH && sudo docker compose build"
print_info "✓ Docker image built"
echo ""

# Step 5: Start application
print_step "5/5 Starting application..."
$SSH_CMD "cd $REMOTE_PATH && sudo docker compose up -d"
print_info "✓ Application started"
echo ""

print_info "✅ Redeployment complete!"
print_info "📋 Showing logs (Ctrl+C to exit)..."
echo ""
$SSH_CMD "cd $REMOTE_PATH && sudo docker compose logs --tail=50 -f"
