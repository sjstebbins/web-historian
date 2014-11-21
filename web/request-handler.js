var path = require('path');
var helpers = require('./http-helpers');
var archive = require('../helpers/archive-helpers');
var urlParser = require('url');
var fs = require('fs');
// require more modules/folders here!

var actions = {
  'GET': function(request, response){
    var parts = urlParser.parse(request.url);
    // check to see if '/'
    console.log('PARTTSSSSSSS')
    console.log(parts.pathname)
    if (parts.pathname === '/') {
      helpers.serveAssets(response, '/', function(pageInfo) {
        helpers.sendResponse(response, pageInfo);
      });
    } else if (fs.existsSync(archive.paths['siteAssets'] + parts.pathname)) { // check to see if file exists in public
      console.log('POINTSSSS')
      console.log(parts.pathname)
      helpers.serveAssets(response, parts.pathname, function(pageInfo) {
        helpers.sendResponse(response, pageInfo);
      });
    } else if (fs.existsSync(archive.paths['archivedSites'] + parts.pathname)) { // else if check to see if exists in archive
      helpers.serveAssets(response, parts.pathname, function(pageInfo) {
        helpers.sendResponse(response, pageInfo);
      });
    } else { // else return 404
      helpers.sendResponse(response, "Not Found", 404);
    }
  },
  'POST': function(request, response){
    helpers.collectData(request, function(url){
      if(archive.isUrlInList(url)){
        helpers.serveAssets(response, url, function(pageInfo){
          helpers.sendResponse(response, pageInfo);
        });
      } else {
        archive.addUrlToList(url);
        helpers.sendRedirect(response, '/loading.html');
      }
    });
  },
  'OPTIONS': function(request, response){
    helpers.sendResponse(response);
  }
};


exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  if( action ){
    action(req, res);
  } else {
    helpers.sendResponse(res, "Not Found", 404);
  }
};

