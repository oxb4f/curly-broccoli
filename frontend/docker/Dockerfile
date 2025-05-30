FROM node:lts AS base

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

FROM base AS run

EXPOSE 5173

ENTRYPOINT []

FROM base AS build

RUN npm run build

FROM build AS preview

COPY --from=build /app/dist /app/dist

EXPOSE 4173

ENTRYPOINT []