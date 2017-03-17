var express = require('express');

var bodyParser = require('body-parser');

//-----------add--
var mongoose = require('mongoose');

var Dishes = require('../models/dishes');
//----------------



var dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
//.all(function(req,res,next) {
//      res.writeHead(200, { 'Content-Type': 'text/plain' });
//      next();
//})

.get(function(req,res,next){
    //res.end('Will send all the dishes to you!');
    Dishes.find({}, function (err, dish) {
        if (err) throw err;
        res.json(dish);
        // So this res.json basically a method on the response message that we are going to send back. When you call the json method and supply a. JavaScript object or a JavaScript object array in here as a parameter is going to convert that into adjacent string and then ship it back to the client from this server. That's it in one single statement, you have completed everything. You don't even need to set the headers. Because headers will be automatically set to the status code will be set 200 and the content type will be set to application/json automatically when you call this method. 
    });
})

.post(function(req, res, next){
    //res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description); 
    Dishes.create(req.body, function (err, dish) {
        // So in here Dishes.create has the first parameter. I'm going to simply take the requests body. Remember that the requests body has already been parsed by the body parser and converted into appropriate JSON and hung on to that body property there. So I'm just going to parse that to my MongoDB server and say put this into the database. So that's why the first parameter is the item to be inserted. So all I need to do is say req.body. 
        if (err) throw err;
        console.log('Dish created!');
        var id = dish._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the dish with id: ' + id);
    });
})

.delete(function(req, res, next){
        //res.end('Deleting all dishes');
    Dishes.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});


dishRouter.route('/:dishId')
//.all(function(req,res,next) {
//      res.writeHead(200, { 'Content-Type': 'text/plain' });
//      next();
//})

.get(function(req,res,next){
    //res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.put(function(req, res, next){
//    res.write('Updating the dish: ' + req.params.dishId + '\n');
//    res.end('Will update the dish: ' + req.body.name + 
//            ' with details: ' + req.body.description);
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, {
        new: true
    }, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.delete(function(req, res, next){
//        res.end('Deleting dish: ' + req.params.dishId);
     Dishes.findByIdAndRemove(req.params.dishId, function (err, resp) {        
        if (err) throw err;
        res.json(resp);
    });
});


dishRouter.route('/:dishId/comments')
.get(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish.comments);
    });
})

.post(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        dish.comments.push(req.body);//往数组中添加一个元素
        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})

.delete(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        for (var i = (dish.comments.length - 1); i >= 0; i--) {
            dish.comments.id(dish.comments[i]._id).remove();
        }
        dish.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});

dishRouter.route('/:dishId/comments/:commentId')
.get(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish.comments.id(req.params.commentId));
    });
})

.put(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        dish.comments.id(req.params.commentId).remove();
        dish.comments.push(req.body);
        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})

.delete(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        dish.comments.id(req.params.commentId).remove();
        dish.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});


module.exports = dishRouter;