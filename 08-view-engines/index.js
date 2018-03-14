const Hapi = require('hapi');
const Path = require('path');

// Create hapi server instance
const server = new Hapi.Server({
  host: 'localhost',
  port: 3008
});

const liftOff = async () => {
  await server.register([
    {
      plugin: require('vision') // add template rendering support in hapi
    },
    {
      plugin: require('inert') // handle static files and directories in hapi
    },
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
  ]);

  server.views({
    engines: {
      html: require('handlebars'),
      pug: require('pug')
    },
    path: Path.join(__dirname, 'views')
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
      return h.view('pug.pug');
    }
  });

  server.route({
    method: 'GET',
    path: '/handle',
    handler: function (request, h) {
      return h.view('handlebars.html');
    }
  });
  try {
    await server.start();
    console.log('Server started at: ' + server.info.uri);
  }
  catch (err) {
    process.exit(1);
  }
};

liftOff();
