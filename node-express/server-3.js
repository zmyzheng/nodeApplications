var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes', function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
});

app.get('/dishes', function(req,res,next){
        res.end('Will send all the dishes to you!');
});

app.post('/dishes', function(req, res, next){
     res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.delete('/dishes', function(req, res, next){
        res.end('Deleting all dishes');
});

app.get('/dishes/:dishId', function(req,res,next){
        res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});

app.put('/dishes/:dishId', function(req, res, next){
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + 
            ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', function(req, res, next){
        res.end('Deleting dish: ' + req.params.dishId);
});

app.use(express.static(__dirname + '/public'));
// So should you send a request to the slash and ask for the html files or other files that are in the public directory. The server will still continue to serve them just as usual. Only requests that are sent to the /dishes url will be handled by this res construct that I have just done. 

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});