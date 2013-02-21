require("url");

function NodeController(app) {

  var self = this;
  var utils = app.some.utils;
  var nodeAPI = app.some.nodes;

  // REST router 
  this.rest = function(req, res) {
    utils.rest_handler(req, res, this);
  };
  
  // Get a single node 
  this.get = function(req, res) {
    var id = req.param('id');
    nodeAPI.get(id, function(err, node) {
      if (err) res.send(500, err);
      else utils.format(app, res, node);
    });
  };

  // List nodes 
  this.list = function(req, res) {
    nodeAPI.list(req.query, function(err, nodes) {
      if (err) res.send(500, err);
      else res.send(nodes);
    });
  };

  // Create a node
  this.create = function(req, res) {
    nodeAPI.create(req.body, function(err, node) {
      if (err) res.send(500, err);
      else {
        res.set('Location', (req.secure?'https':'http')+'://'+req.host+'/some/api/node/rest/'+node.id);
        res.send(201);
      }
    });
  };

  // Update a node
  this.update = function(req, res) {
    var body = req.body;
    body._id = req.param('id');
    nodeAPI.update(req.body, function(err) {
      if (err) res.send(500, err);
      else res.send(204);
    });
  };

  // Delete a node
  this.destroy = function(req, res) {
    nodeAPI.destroy(req.param('id'), function(err) {
      if (err) res.send(500, err);
      else res.send(204);
    });
  };

}

module.exports = NodeController;














