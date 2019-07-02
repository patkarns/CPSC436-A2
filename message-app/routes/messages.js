let init =[
  // {id: 0, text: 'Good morning!'},
  // {id: 1, text: 'cream puffs!'},
  // {id: 2, text: 'I made cinnamon buns!'}
];

var express = require('express');
var router = express.Router();

var async  = require('express-async-await')
var fetch = require('node-fetch')

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
let assert = require('assert');
let Db = require('mongodb').Db;

const uri = 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox-9e64k.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true });
let collection;

client.connect(err => {
  assert.equal(null, err);
  collection = client.db("MessageApp").collection("messages");
});

router.get('/', function(req, res, next) {
  collection.find().toArray(function(err, items) {
     assert.equal(null, err);
     assert.notEqual(0, items.length);
     console.log(items);
     init = items;
     // db.close();
   });
    res.send(init);
});



router.post('/', function(req, res, next) {
  const newMessage = req.body;
  newMessage.votes = 0;
  collection.insertOne(newMessage);
  setTimeout(function() {
  // Fetch the document
  collection.find().toArray(function(err, items) {
     assert.equal(null, err);
     assert.notEqual(0, items.length);
     console.log(items);
     init = items;
     res.send(items);
     // db.close();
   });
 });

  /*new_user = req.body
  users.push(new_user)
  res.json(new_user)
  */
});

/*
function insertRun(collection) {
  let run = {text: "test add" };
  collection.insertOne(run);
  setTimeout(function() {
  // Fetch the document
  collection.find().toArray(function(err, items) {
     assert.equal(null, err);
     assert.notEqual(0, items.length);
     console.log(items);
     // db.close();
   });
 });
}
*/

router.put('/', function(req, res, next) {

  const newMessage = req.body;
  collection.updateOne({"_id": ObjectId(newMessage._id)}, {$inc: {votes: 1 }});
  // init.push(newMessage)
  // res.setHeader('Content-Type', 'application/json')
  // res.send(JSON.stringify(init));
  setTimeout(function() {
  // Fetch the document
  collection.find().toArray(function(err, items) {
     assert.equal(null, err);
     assert.notEqual(0, items.length);
     console.log('put: ')
     console.log(items);
     init = items;
     res.send(items);
     // db.close();
   });
 });

});


router.delete('/', function(req, res, next) {
  init = [];
  res.send(init);
});

module.exports = router;
