#!/bin/bash
# First-time deployment to VPS
# Login: ssh senja-idcloud -p 69
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
SSH_HOST="senja-idcloud"
SSH_PORT="69"
REMOTE_PATH="~/apps/senja-indexer"
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

# SSH/SCP/rsync command wrappers
SSH_CMD="ssh -p $SSH_PORT $SSH_HOST"
SCP_CMD="scp -P $SSH_PORT"
RSYNC_SSH="ssh -p $SSH_PORT"

print_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
print_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }
print_step() { echo -e "${BLUE}[STEP]${NC} $1"; }

echo ""
print_info "🚀 First-time deployment to VPS via ssh senja-idcloud -p $SSH_PORT"
echo ""

# Step 1: Test SSH connection
print_step "1/6 Testing SSH connection..."
if ! $SSH_CMD "echo 'SSH OK'" > /dev/null 2>&1; then
    print_error "Cannot connect to VPS. Make sure 'senja-idcloud' is configured in ~/.ssh/config"
    echo ""
    echo "Add this to ~/.ssh/config:"
    echo ""
    echo "  Host senja-idcloud"
    echo "    HostName <your-vps-ip>"
    echo "    User root"
    echo "    Port 69"
    echo ""
    exit 1
fi
print_info "✓ SSH connection OK"
echo ""

# Step 2: Setup remote directory & install Docker if needed
print_step "2/6 Setting up remote environment..."
$SSH_CMD "mkdir -p $REMOTE_PATH"
$SSH_CMD "command -v docker > /dev/null 2>&1 || { echo 'Docker not found, installing...'; curl -fsSL https://get.docker.com | sudo sh; }"
$SSH_CMD "sudo docker compose version > /dev/null 2>&1 || { echo 'Docker Compose not found, installing...'; sudo apt-get install -y docker-compose-plugin; }"
print_info "✓ Remote environment ready"
echo ""

# Step 3: Upload project files
print_step "3/6 Uploading project files..."
rsync -avz --progress \
    -e "$RSYNC_SSH" \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude '.env.local' \
    --exclude '.pnpm-store' \
    --exclude 'generated' \
    --exclude '.DS_Store' \
    --exclude 'steps' \
    "$PROJECT_DIR/" "$SSH_HOST:$REMOTE_PATH/"
print_info "✓ Project files uploaded"
echo ""

# Step 4: Upload .env.local as .env
print_step "4/6 Uploading environment configuration..."
if [ -f "$PROJECT_DIR/.env.local" ]; then
    $SCP_CMD "$PROJECT_DIR/.env.local" "$SSH_HOST:$REMOTE_PATH/.env"
    print_info "✓ .env.local uploaded as .env"
else
    print_warn "No .env.local found. Creating .env from .env.example on remote..."
    $SSH_CMD "cd $REMOTE_PATH && cp .env.example .env 2>/dev/null || echo 'No .env.example found either'"
fi
echo ""

# Step 5: Build Docker image
print_step "5/6 Building Docker image..."
$SSH_CMD "cd $REMOTE_PATH && sudo docker compose build --no-cache"
print_info "✓ Docker image built"
echo ""

# Step 6: Start application
print_step "6/6 Starting application..."
$SSH_CMD "cd $REMOTE_PATH && sudo docker compose up -d"
print_info "✓ Application started"
echo ""

print_info "✅ First-time deployment complete!"
echo ""
print_info "Useful commands:"
echo "  View logs:    ssh senja-idcloud -p 69 'cd $REMOTE_PATH && sudo docker compose logs -f'"
echo "  Check status: ssh senja-idcloud -p 69 'cd $REMOTE_PATH && sudo docker compose ps'"
echo "  Restart:      ssh senja-idcloud -p 69 'cd $REMOTE_PATH && sudo docker compose restart'"
echo ""
