var express = require('express');
var morgan = require('morgan');
//Morgan allows me to print out log information on the server side. I will configure Morgan to print out very simple information to the server side. And we will see what the log information that is printed to the screen on the server side by Morgan.
var hostname = 'localhost';
var port = 3000;

var app = express();

//Now, in the next step, I'm going to say that Morgan will be one of the middleware that is used by my Express. So that's why I say app.use(morgan), and for Morgan, I am supplying the parameter in quotes as dev. This is one of the pre formatted log outputs that Morgan supports. We'll look at what it produces on the screen in a short while. So thereafter, the next feature that I'm going to make use of is the support within Express using a middleware called as serve-static. Now, in case of expressive disorder, they built into Express. So I am just simply making use of that here. So, as a app.use(express.static. And then within parameters, I supply (_ _ dirname + ' /public'). So what I am declaring is that the public folder contains all the files that will be served up as static files by this particular server. So anything in the public folder, users can access them by simply requesting for that file through the request and the submit from the client. Now, the _ _dirname that we use in the parameter essentially says that independent of where I start this server, this _ _dirname says that this public folder is with respect to where this particular file resides. So, the interpretation of the total path would be 
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));


//to use the app.lesson function itself to start up the server. Now this is a shortcut, thereby Express automatically the distress with http cleared server. In the previous exercise, I did the longer form for doing this. I did http clear server, and then app, and thereafter I said, server.listen. I can simplify that by simply saying app listen and then Express takes care of registering with http server and then making use of the http client server from there. So that completes the code for my second version of the server. 
app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});