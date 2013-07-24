var PORT=158
var MAPCODE=''



var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
  console.log((new Date()) + ' Received request for ' + request.url);
  response.writeHead(200);
  response.end();
});
server.listen(PORT, function() {
  console.log((new Date()) + ' Server is listening on port '+PORT);
});

wsServer = new WebSocketServer({
  httpServer: server,
  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: false
});

wsServer.on('request', function(request) {
  var connection = request.accept('soap', request.origin);
  console.log((new Date()) + ' Connection accepted.');
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      console.log('Received Message: ' + message.utf8Data);
    }
  }
  connection.on('close', function(reasonCode, description) {
  console.log(connection.remoteAddress+"diconected because: "+reasonCode+";"+description)
  }
}