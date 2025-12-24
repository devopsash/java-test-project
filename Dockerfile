# Use a lightweight Nginx image
FROM nginx:alpine

# Copy static assets to the default Nginx public directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
