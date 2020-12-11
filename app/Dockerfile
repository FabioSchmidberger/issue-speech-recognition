FROM node:12 AS build

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

ARG REACT_APP_NLP_URL
ARG REACT_APP_BASENAME
ARG PUBLIC_URL

RUN yarn build


FROM nginx:1.19-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
