const Hapi = require('hapi');

// Create a server with a host and port
const server = Hapi.server({
  host: 'localhost',
  port: 3005
});

// add a route
server.route({
  method: 'GET',
  path: '/hello',
  config: {
    pre: [{ method: (request, h) => 'WORLD', assign: 'message' }],
    handler: (request, h) => request.pre.message
  }
});

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
