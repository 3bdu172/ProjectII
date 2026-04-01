FROM oven/bun:latest

# Enable automatic health checks
RUN apt-get update && apt-get install -y curl

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

WORKDIR /app

# Copy the neccessary files
COPY ./ ./

# install needed packages
RUN bun install --production --frozen-lockfile

# Expose port 8080
EXPOSE 8080

# Extract the commit info
ARG GIT_COMMIT_SHA
ARG GIT_COMMIT_DATE
ARG GIT_COMMIT_MESSAGE
ENV GIT_COMMIT_SHA=$GIT_COMMIT_SHA
ENV GIT_COMMIT_DATE=$GIT_COMMIT_DATE
ENV GIT_COMMIT_MESSAGE=$GIT_COMMIT_MESSAGE

# Run the server
ENV NODE_ENV=production
CMD ["bun", "src/server.js"]
