# The Mondaypainters

This great project is the answer to all your questions.
It was created for a project which showcases a **Cassandra Use-Case**.
In this game, everyone can collaborate to create an awesome image. Everyone else can then guess the correct answer and gain points to get the highest highscore scored.

The entire project is running at 217.182.197.2. **Come join us!**

## Development server

Run `npm start` for a basic dev Angular Frontend server. Navigate to `http://localhost:4200/`. 
The app will automatically reload if you change any of the source files.
It's also great for just showing the basic idea temporarily.

But note that it is not possible to develop the game locally that easily. Next to the Frontend you need to run the Server that handles the Backend logic. You can start the dev Express Backend server locally by running `PUBLISHER=192.168.99.100 npm run start-express`.

But note that it is not possible to develop the game locally that easily. Next to the Frontend and the Backend you need to run the cassandra, consul and nchan docker containers. Otherwise, the backend will crash.

## Build

Run `ng build` to build the project. 
The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Production

Run `ng build && node server` for a production server. Navigate to `http://localhost:3000/`.
This way a local production server will be started.

## Build Test Cassandra Container

To run a seperate Cassandra you can use a simple docker container.

`docker run --name cassandra -d -p "0.0.0.0:7191:7191" -p "0.0.0.0:7000:7000" -p "0.0.0.0:7001:7001" -p "0.0.0.0:9160:9160" -p "0.0.0.0:9042:9042" -e CASSANDRA_BROADCAST_ADDRESS=192.168.99.100 cassandra:latest`

**_ASK BASTI FOR EXACT PARAMETERS AND TABLE INITIALIZATION (CONSUL?)_**

When to start Consul?
`docker run -ti -d --name=consul gliderlabs/consul-server:latest -bootstrap`

## Build Test nginx and nchan Container

To run the nginx Container, which works with cassandra, use the following command:

`docker run -ti -d -p 80:80 -p 1080:1080 --link=consul nginx-lb-cassandra`
  
Nchan is also necessary to run the Backendsocket. For this you can use the nchan docker container.

`cd /nchan
docker-compose build
docker run --name nchan -d -p "0.0.0.0:9080:9080" <the_composed_image_name_here>:latet`

When everything is done, POST requests can be sent to http://nginx_lb:1080/pub.

**_ASK BASTI OR CHRIS FOR EXACT COMPOSED IMAGE NAME_**

## Local Start of Everything

If you want to easily start everything you need, just use the Docker Compose file which is provided here: 
**_ASK CHRIS FOR COMPOSE FILE_**

## Running unit tests

We don't need to test.

## Running end-to-end tests

And especially not E2E