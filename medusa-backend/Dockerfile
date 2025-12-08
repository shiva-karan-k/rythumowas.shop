FROM node:20-alpine

WORKDIR /app

# Install pnpm 10 via corepack
RUN corepack enable && corepack prepare pnpm@10.24.0 --activate

# Copy manifest and lock first for better caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Production env
ENV NODE_ENV=production

# Expose Medusa default port
EXPOSE 9000

# Start Medusa
CMD ["pnpm", "start"]

