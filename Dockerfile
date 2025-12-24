# Use a lightweight Nginx image
FROM nginx:alpine

# Copy custom Nginx config for API proxying
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static assets to the default Nginx public directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
