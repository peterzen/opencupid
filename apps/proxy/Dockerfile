FROM nginx:alpine

# Remove default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create cache directory
RUN mkdir -p /var/cache/nginx

# Set permissions
RUN chown -R nginx:nginx /var/cache/nginx

# Expose port 80
EXPOSE 80 443

# Start nginx
CMD ["nginx", "-g", "daemon off;"]