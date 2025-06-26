# Production deployment

## Seeding database

`docker compose exec backend npx node prisma/seed/Tags.js`

`docker compose exec backend npx node prisma/seed/Tags.js`

## Certbot

### Issue certs

 ```bash
docker run -it  --rm -p 80:80   -v certbot-etc:/etc/letsencrypt   certbot/certbot certonly   --standalone
```

### Configure cron jobs

Add a daily cron job or scheduled task:

`docker compose run --rm certbot renew --nginx && docker exec ingress nginx -s reload`
