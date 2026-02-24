#!/bin/bash
# Setup Nginx reverse proxy for senja-indexer
# Compatible with Cloudflare Proxied mode
# Login: ssh senja-idcloud -p 69
set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

SSH_HOST="senja-idcloud"
SSH_PORT="69"
SSH_CMD="ssh -p $SSH_PORT $SSH_HOST"
DOMAIN="indexer.senja.finance"

echo -e "${BLUE}[STEP]${NC} 1/4 Installing Nginx..."
$SSH_CMD "sudo apt-get update -qq && sudo apt-get install -y nginx"

echo -e "${BLUE}[STEP]${NC} 2/4 Creating Nginx config for $DOMAIN..."
$SSH_CMD "sudo tee /etc/nginx/sites-available/$DOMAIN > /dev/null" << 'NGINX_EOF'
server {
    listen 80;
    server_name indexer.senja.finance;

    # Cloudflare real IP restoration
    set_real_ip_from 103.21.244.0/22;
    set_real_ip_from 103.22.200.0/22;
    set_real_ip_from 103.31.4.0/22;
    set_real_ip_from 104.16.0.0/13;
    set_real_ip_from 104.24.0.0/14;
    set_real_ip_from 108.162.192.0/18;
    set_real_ip_from 131.0.72.0/22;
    set_real_ip_from 141.101.64.0/18;
    set_real_ip_from 162.158.0.0/15;
    set_real_ip_from 172.64.0.0/13;
    set_real_ip_from 173.245.48.0/20;
    set_real_ip_from 188.114.96.0/20;
    set_real_ip_from 190.93.240.0/20;
    set_real_ip_from 197.234.240.0/22;
    set_real_ip_from 198.41.128.0/17;
    real_ip_header CF-Connecting-IP;

    location / {
        proxy_pass http://127.0.0.1:42069;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts for long-running indexer queries
        proxy_read_timeout 120s;
        proxy_connect_timeout 10s;
        proxy_send_timeout 120s;
    }
}
NGINX_EOF

echo -e "${BLUE}[STEP]${NC} 3/4 Enabling site & removing default..."
$SSH_CMD "sudo ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/$DOMAIN"
$SSH_CMD "sudo rm -f /etc/nginx/sites-enabled/default"

echo -e "${BLUE}[STEP]${NC} 4/4 Testing & restarting Nginx..."
$SSH_CMD "sudo nginx -t && sudo systemctl enable nginx && sudo systemctl restart nginx"

echo ""
echo -e "${GREEN}[INFO]${NC} ✅ Nginx reverse proxy setup complete!"
echo -e "${GREEN}[INFO]${NC} $DOMAIN → localhost:42069"
echo -e "${GREEN}[INFO]${NC} Cloudflare Proxied mode compatible (no SSL needed on server, Cloudflare handles it)"
