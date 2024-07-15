### base
FROM oven/bun:alpine AS base

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
COPY  --from=base package*.json ./
COPY .env.defaults ./
COPY tsconfig*.json ./
COPY drizzle.config.ts ./
COPY migrations ./
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
