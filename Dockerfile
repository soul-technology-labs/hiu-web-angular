# Stage 1
FROM node:10-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

# Stage 2

FROM nginx:1.17.1-alpine

## Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=build-step /app/dist/hiu-web-angular /usr/share/nginx/html