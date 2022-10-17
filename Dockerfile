# stage 1

FROM node:alpine AS cyber-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# stage 2

FROM nginx:alpine
COPY --from=cyber-build /app/dist/cyber-front /usr/share/nginx/html
EXPOSE 80