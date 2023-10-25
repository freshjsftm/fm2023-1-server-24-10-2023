const http = require('http');
const fs = require('fs');
const PORT = 3000;
const requestListener = (request, response) => {
  console.log('request ----->>>> ', request.url, request.method);
  // console.log('response ----->>>> ', response);
  fs.readFile('./views/index.html', {encoding: 'utf8'}, (err, data)=>{
    if(err){
      console.log(err);
    }
    response.end(data);
  })
};
const server = http.createServer(requestListener);
server.listen(PORT, ()=>{console.log('server started!');});
//console.log(server);
