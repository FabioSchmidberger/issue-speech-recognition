FROM nginx:1.19-alpine

COPY nginx.template /etc/nginx/conf.d/nginx.template

CMD ["/bin/sh",  "-c", "envsubst < /etc/nginx/conf.d/nginx.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
