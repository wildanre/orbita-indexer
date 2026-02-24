# syntax = docker/dockerfile:1

# Use Bun as runtime
FROM oven/bun:1 AS base

LABEL fly_launch_runtime="Bun"

WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Install dependencies
FROM base AS install

# Install packages needed to build native modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential pkg-config python-is-python3

# Install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Copy application code
FROM base AS release

# Copy installed dependencies
COPY --from=install /app/node_modules /app/node_modules

# Copy application code
COPY . .

# Expose port
EXPOSE 42070

# Start with bun
CMD ["bun", "run", "start"]
