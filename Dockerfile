# STAGE: Development
FROM node:14-alpine3.12 AS dev

# Port to listen on
EXPOSE 3000

# Copy app and install packages
WORKDIR /app
COPY . /app/

RUN yarn

# Default app commands
CMD ["yarn", "start:dev"]

# STAGE: Builder
FROM node:14-alpine3.12 AS builder
WORKDIR /app
COPY --from=dev /app /app
RUN yarn build

# STAGE: Prod Dependencies Builder
FROM node:14-alpine3.12 AS prod-dependencies
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --prod

# STAGE: Prod Deploy Ready Image
FROM node:14-alpine3.12 AS prod
EXPOSE 3000
WORKDIR /app
COPY public /app/public
COPY --from=builder /app/dist /app/dist
COPY --from=prod-dependencies /app/node_modules /app/node_modules
CMD ["node", "dist/index.js"]
