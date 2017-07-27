# The Mondaypainters

This great project is the answer to all your questions.
It was created for a project which showcases a **Cassandra Use-Case**.
In this game, everyone can collaborate to create an awesome image. Everyone else can then guess the correct answer and gain points to get the highest highscore scored.

The entire project is running at 217.182.197.2. **Come join us!**


## Production

### Local Start of Everything
If you want to easily start everything you need, just use the Docker Compose file: 

```
wget https://raw.githubusercontent.com/TimMaa/project-bladerunner/develop/docker-compose.yml
docker-compose up
```

The server will then be available on port 80


## Development Environment

### Development Angular Server

Run `npm start` for a basic dev Angular Frontend server. Navigate to `http://localhost:4200/`. 
The app will automatically reload if you change any of the source files.
It's also great for just showing the basic idea temporarily.

But note that it is not possible to develop the game locally that easily. Next to the Frontend and the Backend you need to run the cassandra, consul and nchan docker containers. Otherwise, the backend will crash.

### Start Angular Development Environment

Run `ng build` to build the project. 
The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Run Test Cassandra Container
To run a seperate Cassandra you can use a simple docker container.

`docker run --name cassandra -d -p "0.0.0.0:7191:7191" -p "0.0.0.0:7000:7000" -p "0.0.0.0:7001:7001" -p "0.0.0.0:9160:9160" -p "0.0.0.0:9042:9042" -e CASSANDRA_BROADCAST_ADDRESS=192.168.99.100 cassandra:latest`

`node init.js`


### Run Test Consul Container
To run a seperate Consul you can use a simple docker container.
`docker run -ti -d --name=consul gliderlabs/consul-server:latest -bootstrap`

### Run Test nginx and nchan Container
To run the nginx Container, which works with cassandra, use the following command:
`docker pull timmaa/nginx-lb-nachan`
`docker run -ti -d -p 80:80 -p 1080:1080 --link=consul timmaa/nginx-lb-nachan`
  
#### Build local nchan Container
```cd /nchan
docker build -t timmaa/nginx-lb-nchan
docker run --name nchan -d -p "0.0.0.0:9080:9080" timmaa/nginx-lb-nachan
```


### Start Express-Api Development Environment
`PUBLISHER=192.168.99.100 npm run start-express`

Before starting Express-Backend please start Cassandra and run `node init.js` once

### Start Bot
Local:
`BOTTARGET=<ip> BOTTIME=<intervall_in_ms> node server/bots/bots.js` 
In Container:

`docker run --name bot1 -d -p timma/project-bladerunner node server/bots/bots.js`
