# build stage
FROM node:12.14.0-alpine as build-stage
# WORKDIR /app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:1.16.1-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

# EXPOSE 80
EXPOSE 8000

CMD [ "nginx", "-g", "daemon off;"]

