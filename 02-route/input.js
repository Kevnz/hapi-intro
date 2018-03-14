const Joi = require('joi');

module.exports = {
  method: 'POST',
  config: {
    validate: {
      failAction: (request, h, err) => {
        return err;
      },
      params: {
        name: Joi.string()
          .min(3)
          .max(10)
          .error(new Error('Name must be between 3 and 10 characters'))
      },
      payload: {
        title: Joi.string().required(),
        birthyear: Joi.number()
          .integer()
          .min(1900)
          .max(2013)
          .required()
      }
    }
  },
  path: '/input/{name}',
  handler: (request, h) => 'hello world'
};
