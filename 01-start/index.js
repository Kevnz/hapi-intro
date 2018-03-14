const Hapi = require('hapi');

const input = require('./input');

// Create a server with a host and port
const server = Hapi.server({
  host: 'localhost',
  port: 3001
});

// add a route
server.route({
  method: 'GET',
  path: '/hello',
  handler: (request, h) => 'hello world'
});
server.route(input);

const start = async () => {
  try {
    await server.start();
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('Server running at:', server.info.uri);
};

start();
