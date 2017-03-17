var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var dboper = require('./operations');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    dboper.insertDocument(db, { name: "Vadonut", description: "Test" },
        "dishes", function (result) {
            console.log(result.ops);

            dboper.findDocuments(db, "dishes", function (docs) {
                console.log(docs);
                
                // And note that this is inside the callback function of the findDocuments because I want the findDocuments to complete. And when the callback is called, then I'm going to issue the updateDocument. 
                // note that I am only specifying the name as the second parameter. I'm not specifying the entire document to be updated, I am only specifying the name. So this way I can filter all the documents inside my collection and then only identify those documents that I'm going to update. 
                dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" },
                    "dishes", function (result) {
                        console.log(result.result);
                        dboper.findDocuments(db, "dishes", function (docs) {
                            console.log(docs)

                            db.dropCollection("dishes", function (result) {
                                console.log(result);

                                db.close();
                            });
                        });
                    });
            });
        });
});
//note that each operation is enclosed inside the callback function of the previous operation. So that way, the sequential execution of these four operations will be ensured. 