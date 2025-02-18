# Stage 1: Build Stage
FROM node:18 as build

WORKDIR /app

# Install dependencies separately to leverage Docker caching
COPY backend/package*.json backend/
COPY frontend/package*.json frontend/

RUN cd backend && npm install --omit=dev
RUN cd frontend && npm install --omit=dev

# Copy source code
COPY backend/ backend/
COPY frontend/ frontend/

# Build React frontend
RUN cd frontend && npm run build

# Stage 2: Final Minimal Runtime (Distroless)
FROM gcr.io/distroless/nodejs18

WORKDIR /app

# Copy only necessary backend files
COPY --from=build /app/backend /app/backend

# Copy frontend build into backend's public directory
COPY --from=build /app/frontend/build /app/backend/public

# Set working directory to backend
WORKDIR /app/backend

# Expose port
EXPOSE 5000

# Start backend server
CMD ["node", "server.js"]


