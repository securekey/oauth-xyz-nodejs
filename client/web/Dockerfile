FROM node

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

EXPOSE 5000
CMD ["npm", "run", "start"]