const http = require('http');
const fs = require('fs').promises;
const PORT = 3000;
const users = [];
const routerGET = {
  '/': './views/index.html',
  '/about': './views/about.html',
  '/contacts': './views/contacts.html',
}
const requestListener = async (request, response) => {
  const { url, method } = request;
  if (method === 'GET') {
    try {
      const data = await fs.readFile(routerGET[url], {
        encoding: 'utf8',
      });
      return response.end(data);
    } catch (error) {
      console.log(error);
    }
  }
  if (method === 'POST') {
    if (url === '/users') {
      let jsonData = '';
      request.on('data', (chunk) => {
        jsonData += chunk;
      });
      request.on('end', () => {
        const user = JSON.parse(jsonData);
        console.log(user);
        delete user.password;
        user.id = Date.now();
        users.push(user); //add to DB
        console.log(users);
        response.end(JSON.stringify(user));
      });
    }
  }
  const data = await fs.readFile('./views/404.html', { encoding: 'utf8' });
  return response.end(data)
};
const server = http.createServer(requestListener);
server.listen(PORT, () => {
  console.log('server started!');
});
