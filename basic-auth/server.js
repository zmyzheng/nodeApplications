var express = require('express');
var morgan = require('morgan');
//Morgan allows me to print out log information on the server side. I will configure Morgan to print out very simple information to the server side. And we will see what the log information that is printed to the screen on the server side by Morgan.
var hostname = 'localhost';
var port = 3000;

var app = express();

//Now, in the next step, I'm going to say that Morgan will be one of the middleware that is used by my Express. So that's why I say app.use(morgan), and for Morgan, I am supplying the parameter in quotes as dev. This is one of the pre formatted log outputs that Morgan supports. We'll look at what it produces on the screen in a short while. So thereafter, the next feature that I'm going to make use of is the support within Express using a middleware called as serve-static. Now, in case of expressive disorder, they built into Express. So I am just simply making use of that here. So, as a app.use(express.static. And then within parameters, I supply (_ _ dirname + ' /public'). So what I am declaring is that the public folder contains all the files that will be served up as static files by this particular server. So anything in the public folder, users can access them by simply requesting for that file through the request and the submit from the client. Now, the _ _dirname that we use in the parameter essentially says that independent of where I start this server, this _ _dirname says that this public folder is with respect to where this particular file resides. So, the interpretation of the total path would be 
app.use(morgan('dev'));

//------add------

//这个函数就是一个middleware
function auth (req, res, next) {
    console.log(req.headers);
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        var err = new Error('You are not authenticated!');
        err.status = 401;
        next(err);
        //If you call the next with the error as the parameter, it automatically raises the error, then, as you go down the chain of middleware, only the function that takes that error and then books on the error will be triggered in part. The remaining ones will simply be bypassed and not used at the point.
        return;
    }
//                                  ' '前是basic
    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == 'admin' && pass == 'password') {
        next(); // authorized
    } else {
        var err = new Error('You are not authenticated!');
        err.status = 401;
        next(err);
        
    }
}



app.use(auth);
//. The express applies the middleware to any incoming request. In the order in which you specify them in the, express application here. So first, if you go back you see that we have an app use login so you're going to first do the logging. Thereafter, it's going to apply this authentication function as the middleware next. Then after that it's going to the static serving of the files from the public folder. So, we have now inserted a basic authentication before serving up our files from the static folder. So, if you try to access any file from the static folder, it will refuse to serve you until you authenticate.
app.use(express.static(__dirname + '/public'));

// Now what happens if you raise an error? If you raise an error, obviously the remaining app uses are not handling that, so let me introduce another middleware here, which specifically handles the error. To do that, I will introduce another app use with a middleware function here Which takes four parameters, err, req, res, and next, Which means that if an error is generated somewhere, and then I call next error, that will drop him into this particular middleware in this case.
app.use(function(err,req,res,next) {
    //if the status value has been set in the authentication middle ware, then I will use that. Otherwise I will set the error status to 500, status quote to 500. 500 is internal server error. So that's the default if you don't know what else to tell the client.
            res.writeHead(err.status || 500, {
            'WWW-Authenticate': 'Basic',
            'Content-Type': 'text/plain'
        });
        res.end(err.message);
});


//--------

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});