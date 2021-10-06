FROM node:14-alpine

WORKDIR /frontend

COPY package.json package-lock.json ./
RUN npm ci

CMD ["npm", "start"]
