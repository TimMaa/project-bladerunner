FROM node:8

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install --unsafe-perm -g @angular/cli

ADD package.json package.json
RUN npm install
ADD . .

RUN ng build --prod --output-hashing none --no-progress

EXPOSE 3000

CMD ["node", "server.js"]
