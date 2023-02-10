# stage 1

FROM node:latest AS cyber-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build --prod

# stage 2

FROM nginx:latest
COPY --from=cyber-build /app/dist/cyber-front /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
