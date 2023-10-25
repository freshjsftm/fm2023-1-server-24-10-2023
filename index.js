const http = require('http');
const fs = require('fs');
const PORT = 3000;
const requestListener = (request, response) => {
  const { url, method } = request;
  if (method === 'GET') {
    if (url === '/') {
      fs.readFile('./views/index.html', { encoding: 'utf8' }, (err, data) => {
        if (err) {
          console.log(err);
        }
        response.end(data);
      });
      return;
    }
    if (url === '/about') {
      fs.readFile('./views/about.html', { encoding: 'utf8' }, (err, data) => {
        if (err) {
          console.log(err);
        }
        response.end(data);
      });
      return;
    }
    if (url === '/contacts') {
      fs.readFile('./views/contacts.html',{ encoding: 'utf8' },(err, data) => {
          if (err) {
            console.log(err);
          }
          response.end(data);
        }
      );
      return;
    }
    fs.readFile('./views/404.html',{ encoding: 'utf8' },(err, data) => {
      if (err) {
        console.log(err);
      }
      response.end(data);
    }
  );
  }
};
const server = http.createServer(requestListener);
server.listen(PORT, () => {
  console.log('server started!');
});
