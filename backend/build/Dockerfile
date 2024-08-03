### base
FROM oven/bun:alpine AS base

RUN apk upgrade --no-cache && \
    apk add --no-cache openssl libgcc libstdc++

RUN mkdir -p /app
WORKDIR /app

COPY package.json ./

COPY bun.lockb ./

RUN bun install


### run
FROM base AS run

RUN mkdir -p /app
WORKDIR /app

COPY  --from=base /app/. .
COPY  --from=base /app/package*.json ./
COPY  --from=base /app/node_modules ./node_modules
COPY .env.defaults ./
COPY tsconfig*.json ./
COPY drizzle.config.ts ./
COPY src ./

ENTRYPOINT []


### test
FROM run AS test

RUN mkdir -p /app
WORKDIR /app

COPY --from=run /app/. .
COPY --from=base /app/package*.json ./

RUN bun install

ENTRYPOINT []
