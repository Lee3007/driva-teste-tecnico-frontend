FROM node:20-alpine
RUN npm install -g pnpm

WORKDIR /app
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY packages/shared/package.json packages/shared/
COPY backend/package.json backend/

RUN pnpm install --frozen-lockfile

COPY packages/shared/ packages/shared/
COPY backend/ backend/

EXPOSE 8000
ENV PORT=8000
CMD ["pnpm", "--filter", "@market/backend", "start"]
