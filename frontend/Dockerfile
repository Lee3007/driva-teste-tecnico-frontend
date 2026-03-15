# Build stage
FROM node:20-alpine AS build
RUN npm install -g pnpm

WORKDIR /app
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY packages/shared/package.json packages/shared/
COPY frontend/package.json frontend/

RUN pnpm install --frozen-lockfile

COPY packages/shared/ packages/shared/
COPY frontend/ frontend/

RUN pnpm --filter @market/frontend build

# Serve stage
FROM nginx:alpine
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/dist /usr/share/nginx/html
EXPOSE 80
