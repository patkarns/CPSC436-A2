var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');
var messagesRouter = require('./routes/messages');
var filteredRouter = require('./routes/filtered');
const bodyParser = require('body-parser');
var flash = require('express-flash');

var app = express();


//
// client.connect(err => {
//   const collection = client.db("MessageApp").collection("messages");
//   assert.equal(null, err);
//   insertRun(collection);
//   // perform actions on the collection object
//   //client.close();
// });
//
// function insertRun(collection) {
//   let run = {text: "test add" };
//   collection.insertOne(run);
//   setTimeout(function() {
//   // Fetch the document
//   collection.find().toArray(function(err, items) {
//      assert.equal(null, err);
//      assert.notEqual(0, items.length);
//      console.log(items);
//      // db.close();
//    });
//  });
// }

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.use(express.static('./client/build/'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/test', testRouter);
app.use('/messages', messagesRouter);
app.use('/filtered', filteredRouter);


app.use(cors());
app.use(flash());
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
app.get('*', function(req, res) {
    res.sendFile(__dirname+'/client/build/index.html');
  });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// if (process.env.NODE_ENV === 'production') {
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, 'client/build')));
//
//   // Handle React routing, return all requests to React app
//   app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// }


app.listen(process.env.PORT || 5000)
//app.listen(5000);
// module.exports = app;
