var http = require("http");
var handler = require("./request-handler");
var urlParser = require('url');
var helpers = require('./http-helpers');

var port = 8080;
var ip = "127.0.0.1";

var routes = {
  '/': require('./request-handler'),
  '/styles.css': require('./request-handler'),
  '/bower_components/jquery/dist/jquery.js': require('./request-handler'),
  '/scripts/app.js': require('./request-handler'),
  '/loading.html':  require('./request-handler')
};

var server = http.createServer(function(request, response){
  console.log("Serving request type " + request.method + " for url " + request.url);

  var parts = urlParser.parse(request.url);
  console.log("PARTS in BASIC!!!!" + parts)
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

