FROM node:17-slim AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci

FROM node:17-slim AS build

WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:17-slim AS prod

EXPOSE 3000

WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000

COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/next.config.js ./next.config.js

CMD ["node_modules/.bin/next", "start"]
