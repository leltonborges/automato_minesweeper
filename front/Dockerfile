FROM node:18-alpine3.20 AS build

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build --configuration production

FROM nginx:alpine AS run

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/front_minefield/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
