# Life of Game (or something else that resembles much writes and reads)

Did you ever feel lost in life?  
Did you ever think noone liked you?  
Did you ever need a database that could read and write super fast?  
  
This great project is your answer!  
It is the frontend for a **Cassandra Use-Case**, which is supposed to be a game where users collaborate (or fight) in drawing images on a canvas.


## Development server

Run `npm start` for a dev Angular server. Navigate to `http://localhost:4200/`. 
The app will automatically reload if you change any of the source files.
It's also great for just showing it temporarily.

Run `npm run start-express` for a dev Express server.

## Build

Run `ng build` to build the project. 
The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Production

Run `ng build && node server` for a production server. Navigate to `http://localhost:3000/`.

## Running unit tests

We don't need to test.

## Running end-to-end tests

And especially not E2E

## Build Test Cassandra Container

`docker run docker run —name <your_beautiful_name_here> -d -p "0.0.0.0:7191:7191" -p "0.0.0.0:7000:7000" -p "0.0.0.0:7001:7001" -p "0.0.0.0:9160:9160" -p "0.0.0.0:9042:9042" -e CASSANDRA_BROADCAST_ADDRESS=192.168.99.100 cassandra:latest`

## Build Test nchan Container

`cd /nchan
docker-compose build
docker run --name <your_beautiful_other_name_here> -d -p "0.0.0.0:9080:9080" <the_composed_image_name_here>:latet`
