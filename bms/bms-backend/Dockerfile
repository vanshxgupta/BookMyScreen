# Build Stage

FROM node:20-alpine AS build

WORKDIR /app

# Copy package files from host machine to container
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy complete source code from host machine to container
COPY . /app

# Build TypeScript project
RUN npm run build


# Production Stage

FROM node:20-alpine

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

# Install only production dependencies
RUN npm ci --omit=dev

# Copy compiled code from build stage
COPY --from=build /app/dist /app/dist

# Give ownership to node user
RUN chown -R node:node /app

# Give read/write/execute permissions
RUN chmod -R 755 /app

# Install PM2 globally
RUN npm install --global pm2

# Copy PM2 configuration file
COPY ecosystem.config.js /app/ecosystem.config.js

COPY start.sh /app/start.sh

# Make startup script executable
RUN chmod +x /app/start.sh

USER node

EXPOSE 9000

# Start application
CMD ["sh", "/app/start.sh"]

