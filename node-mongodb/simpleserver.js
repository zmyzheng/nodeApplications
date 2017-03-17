var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    assert.equal(err,null);//In case there is an error establishing the connection, the error will be not null, and so this assert will make our application fail at that point and then print out the appropriate Information. 
    console.log("Connected correctly to server");
    
    var collection = db.collection("dishes");
    collection.insertOne({name: "Uthapizza", description: "test"}, function(err,result){
        assert.equal(err,null);
        console.log("After Insert:");
        console.log(result.ops);// This result is an object that comes back, which contains a property called ops. That ops contains an array of all the documents that have been inserted by this insert operation. 
        collection.find({}).toArray(function(err,docs){
            assert.equal(err,null);
            console.log("Found:");
            console.log(docs);
            // this find when it is supplied with a particular filter value. The filter value is usually supplied as a property on which you're going to filter the items that are part of this collection. So a certain time giving it an empty collection source of find and then the left and right braces and empty left and right braces giving that as a perimeter so it's going to return all of the documents that are part of this collection. 
            //note this use of call back functions in every step. The reason for this is any database query takes time, so you had to wait for that operation to be completed in the database server and then the database server will call back this function. To return the value to your node application. So that's the reason why we always have to supply these callback functions there. 
            db.dropCollection("dishes", function(err, result){
               assert.equal(err,null);
               db.close();
            });
        });
    });
});