# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY vita-ai-react/package*.json ./
RUN npm install

# Copy source and build
COPY vita-ai-react/ ./
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Remove unnecessary files from image
RUN rm -f /usr/share/nginx/html/Dockerfile \
    /usr/share/nginx/html/docker-compose*.yml \
    /usr/share/nginx/html/nginx.conf \
    /usr/share/nginx/html/.dockerignore \
    /usr/share/nginx/html/.git* 2>/dev/null || true

# Create health check endpoint (if not already in dist)
RUN echo "OK" > /usr/share/nginx/html/health

# Security: Run as non-root
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
