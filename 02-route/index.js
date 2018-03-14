const Hapi = require('hapi');
const Input = require('./input');
const Responses = require('./responses');

// Create a server with a host and port
const server = Hapi.server({
  host: 'localhost',
  port: 3002
});

// add a route
server.route({
  method: 'GET',
  path: '/',
  handler: (request) => 'hello world'
});
server.route(Input);
server.route(Responses);
const start = async () => {
  //
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
