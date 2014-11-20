var path = require('path');
var helpers = require('./http-helpers');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

var actions = {
  'GET': function(request, response){
    helpers.sendResponse(response);
  },
  'POST': function(request, response){
    helpers.collectData(request, function(url){
      if(helpers.checkUrl(url)){
        helpers.serveAssets(response, url, function(pageInfo){
          helpers.sendResponse(response, pageInfo);
        });
      } else {
        helpers.serveAssets(response, 'loading', function(pageInfo){
          helpers.sendResponse(response, pageInfo);
        });
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

