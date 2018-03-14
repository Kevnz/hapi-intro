const Hapi = require('hapi');

// Create a server with a host and port
const server = Hapi.server({
  host: 'localhost',
  port: 3004
});

// add a route
server.route({
  method: 'GET',
  path: '/hello',
  handler: (request, h) => {
    server.log(['info'], 'hello world');
    request.echo('HI THERE');
    return 'hello world';
  }
});

const plugins = [
  {
    plugin: require('good'),
    options: {
      ops: {
        interval: 30 * 200
      },
      reporters: {
        console: [
          {
            module: 'good-console',
            args: [{ log: '*', response: '*', log: '*' }]
          },
          'stdout'
        ]
      }
    }
  }
];
const start = async () => {
  try {
    await server.register(plugins);
    await server.register(require('./plugin'));
    await server.start();
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
};

start();
