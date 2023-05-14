# base image
FROM node:latest as react-build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn install --silent
RUN yarn global add react-scripts@4.0.3 --silent

COPY . /app

RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=react-build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
