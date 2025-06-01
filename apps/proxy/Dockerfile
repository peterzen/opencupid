FROM nginx:alpine

# Install openssl
RUN apk add --no-cache openssl

# Generate self-signed cert during build
RUN mkdir -p /etc/ssl/certs && \
    mkdir -p /etc/ssl/private && \
    openssl req -x509 -nodes -days 365 \
      -newkey rsa:2048 \
      -keyout /etc/ssl/private/proxy.key \
      -out /etc/ssl/certs/proxy.crt \
      -subj "/C=US/ST=Dev/L=Local/O=Dev/CN=oc.dev.froggle.org"

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 443
EXPOSE 80