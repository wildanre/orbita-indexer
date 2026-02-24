#!/bin/bash
# Cleanup PostgreSQL Docker dan kembali ke Supabase
set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Removing PostgreSQL Docker and reverting to Supabase...${NC}"
echo ""

# Stop all containers
echo -e "${GREEN}[1/4]${NC} Stopping containers..."
docker-compose down

# Remove PostgreSQL volume
echo -e "${GREEN}[2/4]${NC} Removing PostgreSQL volume..."
docker volume rm senja-indexer_postgres-data 2>/dev/null || echo "Volume already removed"

# Remove PostgreSQL container (if any)
echo -e "${GREEN}[3/4]${NC} Removing PostgreSQL container..."
docker rm -f senja-postgres 2>/dev/null || echo "Container already removed"

# Start with Supabase config
echo -e "${GREEN}[4/4]${NC} Restarting with Supabase..."
docker-compose up -d

echo ""
echo -e "${GREEN}✓ Successfully reverted to Supabase!${NC}"
echo ""
echo -e "${YELLOW}Check logs:${NC}"
echo "  docker-compose logs -f"
