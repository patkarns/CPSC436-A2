let init =[
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
  collection.aggregate([{$sort: {votes: -1}},{$limit: 3}]).toArray(function(err, items) {
     assert.equal(null, err);
     assert.notEqual(0, items.length);
     console.log(items);
     init = items;
     res.send(items);
     // db.close();
   });
  //  res.send(init);
});


module.exports = router;
