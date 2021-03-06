# syntax=docker/dockerfile:1
#FROM node:12 AS build
#WORKDIR /app
#COPY package* yarn.lock ./
#RUN yarn install
#COPY public ./public
#COPY src ./src
#RUN yarn run build
#comment
FROM nginx:alpine
COPY ./build /usr/share/nginx/html
#COPY --from=build /app/build /usr/share/nginx/html