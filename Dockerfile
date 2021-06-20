FROM node:14.17-alpine
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 4000
CMD ["npm", "start"]