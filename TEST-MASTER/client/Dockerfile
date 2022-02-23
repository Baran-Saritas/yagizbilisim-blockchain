FROM node:14-alpine
WORKDIR /app/server
ADD package*.json ./
RUN npm install
ADD . .
CMD npm start
