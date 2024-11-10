# Stage 1: Build the Next.js application
FROM node:18 AS builder

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --legacy-peer-deps

# Copy the rest of the application source code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Run the application in a lightweight environment
FROM node:18-slim AS runner

# Set working directory in the container
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Define environment variables for production
ENV NODE_ENV=production
ENV PORT=3000

# Expose the application port
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]
