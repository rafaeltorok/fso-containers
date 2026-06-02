# Build stage
FROM node:20-alpine AS build

WORKDIR /usr/src/app

# Install dependencies
COPY ./package*.json .

RUN npm ci

# Copy the source code
COPY . .

# Run the component tests before the production build
RUN npm run test:run
RUN npm run build

# Production stage
FROM nginx:stable-alpine AS production

# Copy custom Nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy the static build
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
