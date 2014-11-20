var http = require("http");
var handler = require("./request-handler");
var urlParser = require('url');
var helpers = require('./http-helpers');

var port = 8080;
var ip = "127.0.0.1";

var routes = {
  '/': require('./request-handler')
};

var server = http.createServer(function(request, response){
  console.log("Serving request type " + request.method + " for url " + request.url);

  var parts = urlParser.parse(request.url);
  var route = routes[parts.pathname];
  if( route ){
    route.handleRequest(request, response);
  } else {
    helpers.sendResponse(response, "Not Found", 404);
  }
});


  // handler.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

