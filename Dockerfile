# Multi-stage build

# Stage 1: Build the VitePress application
FROM node:18-alpine AS frontend-builder
WORKDIR /app

# Copy package.json and install dependencies
COPY app/package.json ./
RUN npm install

# Copy VitePress source code
COPY app/ ./

# Build the VitePress site
RUN npm run build

# Stage 2: Build the Go server
FROM golang:1.24-alpine AS backend-builder
WORKDIR /build

# Copy Go modules manifests
COPY go.mod go.sum ./
RUN go mod tidy && go mod download

# Copy source code
COPY main.go ./

# Build the Go application
RUN CGO_ENABLED=0 GOOS=linux go build -o server .

# Stage 3: Final image
FROM alpine:latest
WORKDIR /app

# Install ca-certificates for HTTPS
RUN apk --no-cache add ca-certificates

# Copy the built VitePress site from the frontend stage
COPY --from=frontend-builder /app/.vitepress/dist /app/app/.vitepress/dist

# Copy the Go binary from the backend stage
COPY --from=backend-builder /build/server /app/

# Set environment variables
ENV GIN_MODE=release
ENV PORT=8080

# Expose the port
EXPOSE 8080

# Run the Go server
CMD ["./server"]