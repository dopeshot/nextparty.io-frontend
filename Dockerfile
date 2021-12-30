FROM node:16 AS dev

EXPOSE 3000

WORKDIR /usr/src/app

#copy package.json and package-lock.json
COPY package*.json ./

#install dependencies
RUN npm install

#copy source
COPY . .

# Prod builds and deploys with nginx
FROM dev as prod

RUN npm run build

FROM nginx:1.16-alpine

WORKDIR /usr/src/app

COPY --from=prod /usr/src/app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

## add permissions for nginx user as using root is not a good idea
RUN chown -R nginx:nginx /usr/src/app && chmod -R 755 /usr/src/app && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d

RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# no super user
USER nginx

CMD ["nginx", "-g", "daemon off;"] 
