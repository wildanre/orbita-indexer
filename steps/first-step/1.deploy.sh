#first deploy

#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
REMOTE_USER="${VPS_USER:-root}"
REMOTE_HOST="${VPS_HOST}"
REMOTE_PATH="${VPS_PATH:-~/apps/senja-indexer}"
PEM_FILE="${PEM_FILE}"

# Function to print colored messages
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check required variables
if [ -z "$VPS_HOST" ]; then
    print_error "VPS_HOST environment variable is required"
    echo "Usage: VPS_HOST=your-vps-ip PEM_FILE=/path/to/key.pem ./deploy.sh"
    exit 1
fi

if [ -z "$PEM_FILE" ]; then
    print_error "PEM_FILE environment variable is required"
    echo "Usage: VPS_HOST=your-vps-ip PEM_FILE=/path/to/key.pem ./deploy.sh"
    exit 1
fi

# Check if .pem file exists
if [ ! -f "$PEM_FILE" ]; then
    print_error "PEM file not found: $PEM_FILE"
    exit 1
fi

# Fix .pem file permissions
chmod 400 "$PEM_FILE"
print_info "Set PEM file permissions to 400"

# SSH command wrapper
SSH_CMD="ssh -i $PEM_FILE -o StrictHostKeyChecking=no $REMOTE_USER@$REMOTE_HOST"
SCP_CMD="scp -i $PEM_FILE -o StrictHostKeyChecking=no"

print_info "Starting deployment to $REMOTE_USER@$REMOTE_HOST"

# Create remote directory
print_info "Creating remote directory: $REMOTE_PATH"
$SSH_CMD "mkdir -p $REMOTE_PATH"

# Upload project files
print_info "Uploading project files..."
rsync -avz --progress \
    -e "ssh -i $PEM_FILE -o StrictHostKeyChecking=no" \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude '.env.local' \
    --exclude '.pnpm-store' \
    --exclude 'generated' \
    ./ $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/

# Check if .env exists on remote, if not copy from .env.example
print_info "Checking environment configuration..."
$SSH_CMD "cd $REMOTE_PATH && if [ ! -f .env ]; then cp .env.example .env; echo 'Created .env from .env.example - Please update it!'; fi"

# Build and start containers
print_info "Building and starting Docker containers..."
$SSH_CMD "cd $REMOTE_PATH && docker-compose down && docker-compose build && docker-compose up -d"

# Show logs
print_info "Deployment complete! Showing logs..."
$SSH_CMD "cd $REMOTE_PATH && docker-compose logs --tail=50"

print_info "✅ Deployment successful!"
print_info "To view logs: ssh -i $PEM_FILE $REMOTE_USER@$REMOTE_HOST 'cd $REMOTE_PATH && docker-compose logs -f'"
print_info "To check status: ssh -i $PEM_FILE $REMOTE_USER@$REMOTE_HOST 'cd $REMOTE_PATH && docker-compose ps'"
