# Stage 1: Use Node.js image to build the application
FROM rockylinux/rockylinux:8 AS builder
# Install Node.js and npm
RUN dnf install -y curl && \
    curl -fsSL https://rpm.nodesource.com/setup_18.x | bash - && \
    dnf install -y nodejs
# Set the working directory in the container
WORKDIR /app
# Copy package.json and package-lock.json to the container
COPY tnso-libs /app/tnso-libs
COPY package*.json ./
# Install application dependencies
RUN npm install
# Copy the application code to the container
COPY . .
# Build the application (replace 'npm run build' with your build command)
RUN npm run build:prod
# Stage 2: Use NGINX image to serve the built application
FROM nginx:latest
# Copy the built application from the builder stage to NGINX's default serving directory
COPY --from=builder /app/dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose the default NGINX port (80:83)
EXPOSE 80 81 82 83


# Command to start NGINX
CMD ["nginx", "-g", "daemon off;"]