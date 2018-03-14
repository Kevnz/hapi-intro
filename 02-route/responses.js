module.exports = {
  method: 'GET',
  path: '/respond/etag',
  config: {
    handler: (request, responseToolkit) => {
      //
      const response = responseToolkit.entity({ etag: 'abc' });

      if (response) {
        response.header('X', 'y');

        return response;
      }
      console.log('hi');
      return 'ok';
    }
  }
};
