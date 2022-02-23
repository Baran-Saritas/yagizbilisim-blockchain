FROM node:14-alpine
EXPOSE 5000
WORKDIR /app/server
ADD package*.json ./
RUN npm install
ADD . .
CMD npm start