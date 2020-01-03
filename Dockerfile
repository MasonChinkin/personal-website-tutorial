# Build react app artifact in cache
FROM node:12.10.0-alpine
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN npm install
COPY . ./
RUN npm run build
EXPOSE 8010
CMD [ "node", "server.js" ]