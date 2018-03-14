const Hapi = require('hapi');

const server = Hapi.server({
  host: 'localhost',
  port: 4567
});

const start = async () => {
  try {
    server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        return 'hi';
      }
    });
    await server.start();
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('Server running at:', server.info.uri);
};

start();
