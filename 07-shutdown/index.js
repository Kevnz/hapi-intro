const Hapi = require('hapi');

const server = new Hapi.Server({
  host: 'localhost',
  port: 3007
});

const start = async () => {
  // start your server
  try {
    await server.start();
  }
  catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Server running at: ', server.info.uri);
};

start();

// listen on SIGINT signal and gracefully stop the server
process.on('SIGINT', async () => {
  console.log('stopping hapi server');
  try {
    await server.stop({ timeout: 10000 });
    console.log('hapi server stopped');
    process.exit(0);
  }
  catch (err) {
    console.error('shutdown error', err);
    process.exit(1);
  }
});
