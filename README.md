# The Mondaypainters

This great project is the answer to all your questions.
It was created for a project which showcases a **Cassandra Use-Case**.
In this game, everyone can collaborate to create an awesome image. Everyone else can then guess the correct answer and gain points to get the highest highscore scored.

The entire project is running at 217.182.197.2. **Come join us!**


## Why Cassandra?

The idea behind "The Monday Painters" is a game in which multiple are able to exchange their painting and guessing abilities.
To achieve this, it is mandatory to set a stable infrastructure due to performance and user experience. This is were _cassandra_ comes into focus.
Cassandra DB makes it possible to manage enormous sets of data. Through the ability to partitioning and replicate the database, cassandra is makes sure that the information needed is 
available in just milliseconds even if one or more cassandra nodes denial service through technical defect. 

"The Monday Painters" need data to save the coordinates of the current painted points. Cassandra enables clustering of these points. Because of that, sets of points are 
stored efficiently. Because Cassandra is made for high availability and performance, advanced data analysis is more complicated. In case of the game, data analysis does not play 
a big role, which makes Cassandra DB a perfect database.


## Production

### Local Start of Everything
If you want to easily start everything you need, just use the Docker Compose file: 

```
curl -o docker-compose.yml https://raw.githubusercontent.com/TimMaa/project-bladerunner/develop/docker-compose.yml
docker-compose up
```

The server will then be available on port 80


## Development Environment

Please keep in mind that 192.168.99.100 is the ip of our Docker for Windows VM. If you're on Linux or Mac OS it'll likely be simply 127.0.0.1.

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

### Run Test Consul Container
To run a seperate Consul you can use a simple docker container.
`docker run -ti -d -p 8500:8500 --name=consul gliderlabs/consul-server:latest -bootstrap`

### Run Test nginx and nchan Container
To run the nginx Container, which works with cassandra, use the following command:
`docker run -ti -d -p 80:80 -p 1080:1080 --link=consul timmaa/nginx-lb-nchan`

### Start Express-Api Development Environment
`PUBLISHER="http://192.168.99.100:1080/pub" CASSANDRA=192.168.99.100 CONSUL=192.168.99.100 npm run start-express`

Our npm relies on nodemon. If you do want to install it use `npm install -g nodemon` otherwise just replace `npm run start-express` with `node server.js`

Before starting Express-Backend please start Cassandra and run `CASSANDRA=192.168.99.100 node init.js` once.

### Start Bot
Local:
`BOTTARGET=<ip> BOTTIME=<intervall_in_ms> node server/bots/bots.js`
