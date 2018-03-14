const I = require('instrumental-agent');

const register = (server, options) => {
  I.configure({
    apiKey: options.apiKey,
    enabled: true
  });

  server.decorate('request', 'increment', I.increment);
  server.decorate('request', 'gauge', I.gauge);
  server.decorate('server', 'increment', I.increment);
  server.decorate('server', 'gauge', I.gauge);

  server.ext('onRequest', (request, reply) => {
    I.increment('app.web.request');
    request.pre.hrstart = process.hrtime();
    request.pre.I = I;
    return;
  });
  server.ext('onPreResponse', (request, h) => {
    const hrstart = request.pre.hrstart;
    const hrend = process.hrtime(hrstart);
    I.gauge(
      'api.response.time',
      hrend[1] / 1000000 /*, time = now, count = 1 */
    );
    I.gauge('app.web.request', hrend[1] / 1000000 /*, time = now, count = 1 */);
    return;
  });
};

const name = 'instrumental-plugin';

const version = '1.0.0';

const multiple = false;

const dependencies = '';

const once = true;

const pkg = {};

exports.plugin = { register, name, version, multiple, dependencies, once, pkg };
