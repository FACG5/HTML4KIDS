var http = require('http');
var fs = require('fs');
var filterJson = require('./logic.js');
var mainJson = require('./html.json');
var path = require('path');

function serveHome(req, res){
    fs.readFile(__dirname + "/../public/index.html",function(err,file){
        if(err){
            res.writeHead(500, {'content-type': 'text/plain'});
            console.log(err);
            res.end();
        }else{
            res.writeHead(200, {'content-type': "text/html"});
            res.end(file); 
        }
    });
}


function serveFiles(req, res){
    var url = req.url;
    const extension = url.split('.')[1];
    const extensionType = {
        html: 'text/html',
        css: 'text/css',
        js: 'application/javascript',
        ico: 'image/x-icon',
    };
    fs.readFile(path.join(__dirname ,"..",url),function(err,file){
       if(err){
        res.writeHead(500, {'content-type': 'text/plain'});
        console.log(err);
        res.end();           
       } else{
        res.writeHead(200, {'content-type': extensionType[extension]});
        res.end(file);
       }
    })

}


function serveAPI(req, res){
    // var like = req.url.split('/')[length-1];
    var like = '';
    req.on('data', function (chunkOfData) {
        like += chunkOfData;
    });

    var result =filterJson(obj,like);
    res.writeHead(200, {'content-type': 'application/json'});
    res.end(JSON.stringify(result));
}


module.exports = {serveHome,serveFiles,serveAPI};
