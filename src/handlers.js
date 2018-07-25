var http = require("http");
var fs = require("fs");
var filterJson = require("./logic.js");
var mainJson = require("./html_tags.json");
var path = require("path");

function serveHome(req, res) {
  fs.readFile(__dirname + "/../public/index.html", function(err, file) {
    if (err) {
      res.writeHead(500, { "content-type": "text/plain" });
      console.log(err);
      res.end();
    } else {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(file);
    }
  });
}

function serveFiles(req, res) {
  var url = req.url;
  const extension = url.split(".")[1];
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    ico: "image/x-icon",
    jpg: "image/jpg"
  };
  fs.readFile(path.join(__dirname, "..", "public", url), function(err, file) {
    if (err) {
      console.log(err);
    } else {
      res.writeHead(200, { "content-type": extensionType[extension] });
      res.end(file);
    }
  });
}

function serveAPI(req, res) {
  var like = "";
  req.on("data", function(chunkOfData) {
    like += chunkOfData;
  });
  req.on("end", function() {
    var result = filterJson(mainJson,like);
    res.writeHead(200, { "content-type": "application/json" });
    console.log(result);
    res.end(JSON.stringify(result));
  });
}

module.exports = { serveHome, serveFiles, serveAPI };
