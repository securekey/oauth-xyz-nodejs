FROM node

RUN mkdir -p /app
WORKDIR /app

RUN npm install -g serve

COPY package.json /app
RUN npm install

COPY . /app
RUN npm run build

EXPOSE 5000
CMD ["serve", "-s", "build"]