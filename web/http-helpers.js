var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var request = require('request');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};
exports.checkUrl = function(url){
  urls = fs.readFileSync('../archives/sites.txt', 'utf-8');
  urls = urls.split('\n');
  for ( var i = 0; i < urls.length; i++){
    if (url === urls[i]){
      return true;
    }
  }
  return false;
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  if( asset === 'loading'){
    callback(fs.readFileSync('./public/loading.html', 'utf-8'));
  } else {
    callback(fs.readFileSync('../archives/sites/' + asset, 'utf-8'));
  }
};

exports.sendResponse = function(response, data, statusCode){
  console.log('HOLY SHIT THIS WORKS');
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
  console.log(data);
};


exports.collectData = function(request, callback){
  var data = "";
  request.on('data', function(chunk){
    data += chunk;
  });
  request.on('end', function(){
    callback(JSON.parse(data));
  });
};
// As you progress, keep thinking about what helper functions you can put here!
