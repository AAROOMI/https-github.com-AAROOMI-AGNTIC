# Multi-stage build for efficient and secure production deployment
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package descriptors for dependency resolution
COPY package*.json ./

# Install all dependencies including build-time requirements
RUN npm ci

# Copy the entire workspace source files
COPY . .

# Build Vite frontend bundle and compile server-side TypeScript and bundlers
RUN npm run build

# Production-ready stage with minimal footprint
FROM node:20-alpine AS runner

# Use production environment variable
ENV NODE_ENV=production
WORKDIR /usr/src/app

# Copy runtime packages and dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy compiled assets and server bundles from builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/.env.example ./.env.example

# Expose the mandatory ingress port (hardcoded reverse-proxy target)
EXPOSE 3000

# Start the full-stack server
CMD ["npm", "start"]
