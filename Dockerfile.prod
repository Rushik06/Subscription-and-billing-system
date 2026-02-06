# Use Debian-based Node to avoid Alpine issues with better-sqlite3
FROM node:20-bookworm

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies inside the container (Linux-native)
RUN npm install --verbose

# Copy source code
COPY . .

# Compile TypeScript
RUN npm run build

# Expose backend port
EXPOSE 3000

# Start the compiled JS
CMD ["node", "dist/server.js"]
