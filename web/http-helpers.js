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

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)

  // if( asset === 'loading'){
  //   callback(fs.readFileSync(archive.paths['siteAssets'] + '/loading.html', 'utf-8'));
  // } else
   if (asset === '/') {
    callback(fs.readFileSync(archive.paths['siteAssets'] + '/index.html', 'utf-8'));
  } else if (asset.indexOf('/') > -1) {
    var filePath;
    if (fs.existsSync(archive.paths['archivedSites'] + asset)){
      filePath = archive.paths['archivedSites'] + asset;
      callback(fs.readFileSync(filePath, 'utf-8'));
    }
    else if (fs.existsSync(archive.paths['siteAssets'] + asset)){
      filePath = archive.paths['siteAssets'] + asset;
      callback(fs.readFileSync(filePath, 'utf-8'));
    } else {
      console.log('File doesnt exist');
      callback('assest not found', 404);
    }
  } else {
    callback(fs.readFileSync(archive.paths['archivedSites'] + asset, 'utf-8'));
  }
};

exports.sendResponse = function(response, data, statusCode){
  statusCode = statusCode || 200;
  console.log('STATUS CODE:' + statusCode);
  response.writeHead(statusCode, headers);
  response.end(data);
};

exports.sendRedirect = function(response, url) {
  console.log('Redirect', url);
  exports.serveAssets(response, url, function(page) {
    response.writeHead( 200, headers);
    response.end(page);
  });
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
