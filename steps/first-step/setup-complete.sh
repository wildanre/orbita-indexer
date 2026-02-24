#!/bin/bash
# All-in-One Production Setup: Nginx + Rate Limiting + HTTPS
# Run di VPS setelah aplikasi deployed
set -e

DOMAIN="indexer.senja.finance"
EMAIL="mw18804@gmail.com"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Complete Production Setup${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Domain:${NC} $DOMAIN"
echo -e "${GREEN}Email:${NC} $EMAIL"
echo -e "${BLUE}========================================${NC}"
echo ""

# 1. Setup Docker Log Rotation
echo -e "${GREEN}[1/6]${NC} Configuring Docker log rotation..."
sudo mkdir -p /etc/docker
cat <<EOF | sudo tee /etc/docker/daemon.json > /dev/null
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
EOF
sudo systemctl restart docker
echo -e "${GREEN}✓${NC} Docker logs: max 10MB x 3 files\n"

# 2. Install Nginx & Certbot
echo -e "${GREEN}[2/6]${NC} Installing Nginx and Certbot..."
sudo apt-get update -qq
sudo apt-get install -y nginx certbot python3-certbot-nginx
echo -e "${GREEN}✓${NC} Nginx and Certbot installed\n"

# 3. Create Nginx Config with Rate Limiting
echo -e "${GREEN}[3/6]${NC} Creating Nginx configuration..."
cat <<'EOF' | sudo tee /etc/nginx/sites-available/senja-indexer > /dev/null
# Rate limit zones - 1000 requests/second
limit_req_zone $binary_remote_addr zone=graphql_limit:10m rate=1000r/s;

upstream ponder_backend {
    server localhost:42069;
}

server {
    listen 80;
    server_name indexer.senja.finance;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # GraphQL endpoint with rate limiting
    location / {
        # Rate limiting: 1000 req/s with burst of 2000
        limit_req zone=graphql_limit burst=2000 nodelay;
        limit_req_status 429;

        # CORS headers
        add_header Access-Control-Allow-Origin * always;
        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Content-Type, Authorization" always;

        # Handle preflight
        if ($request_method = 'OPTIONS') {
            return 204;
        }

        # Proxy settings
        proxy_pass http://ponder_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health check endpoint (no rate limit)
    location /health {
        proxy_pass http://ponder_backend;
        access_log off;
    }

    # Logging
    access_log /var/log/nginx/senja-indexer-access.log;
    error_log /var/log/nginx/senja-indexer-error.log;
}
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/senja-indexer /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test config
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl restart nginx
echo -e "${GREEN}✓${NC} Nginx configured with 1000 req/s rate limit\n"

# 4. Update Firewall
echo -e "${GREEN}[4/6]${NC} Updating firewall rules..."
if command -v ufw &> /dev/null; then
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    echo -e "${GREEN}✓${NC} Firewall updated (UFW)\n"
else
    sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
    sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
    sudo apt-get install -y iptables-persistent
    sudo netfilter-persistent save
    echo -e "${GREEN}✓${NC} Firewall updated (iptables)\n"
fi

# 5. Obtain SSL Certificate
echo -e "${GREEN}[5/6]${NC} Obtaining SSL certificate from Let's Encrypt..."
echo -e "${YELLOW}This may take 1-2 minutes...${NC}\n"

sudo certbot --nginx -d $DOMAIN \
    --non-interactive \
    --agree-tos \
    --email $EMAIL \
    --redirect

echo -e "${GREEN}✓${NC} SSL certificate installed\n"

# 6. Test SSL Auto-renewal
echo -e "${GREEN}[6/6]${NC} Testing SSL auto-renewal..."
sudo certbot renew --dry-run
echo -e "${GREEN}✓${NC} SSL auto-renewal configured\n"

# Restart services
echo -e "${YELLOW}Restarting services...${NC}"
sudo systemctl restart nginx
cd ~/apps/senja-indexer
docker-compose restart

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✓ Production Setup Complete!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${GREEN}Your application is now live at:${NC}"
echo -e "  ${BLUE}https://$DOMAIN${NC}"
echo ""
echo -e "${GREEN}Features Enabled:${NC}"
echo "  ✓ HTTPS with valid SSL certificate"
echo "  ✓ HTTP → HTTPS auto-redirect"
echo "  ✓ Rate limiting: 1000 req/s (burst: 2000)"
echo "  ✓ Docker log rotation: 10MB x 3 files"
echo "  ✓ Security headers enabled"
echo "  ✓ Auto SSL renewal every 90 days"
echo ""
echo -e "${YELLOW}Test your site:${NC}"
echo "  curl https://$DOMAIN"
echo "  curl -I https://$DOMAIN"
echo ""
echo -e "${YELLOW}Monitor:${NC}"
echo "  docker-compose logs -f"
echo "  sudo tail -f /var/log/nginx/senja-indexer-access.log"
echo ""
