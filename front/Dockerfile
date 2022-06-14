FROM node:14-alpine3.12 AS builder
WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
COPY .env.docker /app/.env
RUN yarn install
COPY . /app
RUN yarn build

FROM nginx:1.16.0-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
