FROM node:alpine as build

ARG service
ENV service=$service

WORKDIR /build
COPY . .
RUN npm ci \
    && npm run build -- "$service"

WORKDIR /app
RUN mv /build/dist . \
 && mv /build/node_modules . \
 && mv /build/package.json . \
 && rm -rf /build

CMD npm run start:prod