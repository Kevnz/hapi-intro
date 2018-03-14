const Hapi = require('hapi');
const Path = require('path');

// Create a server with a host and port and files
const server = Hapi.server({
  host: 'localhost',
  port: 3003,
  routes: {
    files: {
      relativeTo: Path.join(__dirname, 'public')
    }
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
  },
  {
    plugin: require('inert')
  }
];
const start = async () => {
  try {
    await server.register(plugins);
    // add a route
    server.route({
      method: 'GET',
      path: '/hello',
      handler: (request, h) => {
        server.log(['info'], 'hello world');
        return 'hello world';
      }
    });
    server.route({
      method: 'GET',
      path: '/assets/{param*}',
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true,
          index: true
        }
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
