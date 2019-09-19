FROM node

RUN mkdir -p /app
WORKDIR /app

RUN npm install -g typescript

COPY package.json /app
RUN npm install

COPY . /app
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start"]
