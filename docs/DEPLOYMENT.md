# Production deployment

## Seeding database

`docker compose exec backend npx node prisma/seed/Tags.js`

`docker compose exec backend npx node prisma/seed/Tags.js`

## Certbot

### Issue certs

 ```bash
  docker compose run --rm \
    --env-file .env \
    --entrypoint sh certbot -c "
      certbot certonly \
        --webroot -w /var/www/html \
        -d \$DOMAIN \
        --email \$EMAIL \
        --agree-tos \
        --non-interactive
  "
```

### Configure cron jobs

Add a daily cron job or scheduled task:

`docker compose run --rm certbot renew --nginx && docker exec ingress nginx -s reload`
