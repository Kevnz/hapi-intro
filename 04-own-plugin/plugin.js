const Chalk = require('chalk');

const register = async (server, options) => {
  server.decorate('request', 'echo', (msg) => {
    console.log(Chalk.blue.underline.bold('ECHO', msg));
  });
};

const name = 'echo-plugin';

const version = '1.0.0';

const multiple = false;

const once = true;

const pkg = {};

exports.plugin = { register, name, version, multiple, once, pkg };
