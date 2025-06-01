

# Stage 2: nginx static server
FROM nginx:alpine

COPY ./dist /var/www/frontend

# Basic nginx config for static SPA
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
