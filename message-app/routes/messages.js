const init =[
  {id: 0, text: 'Good morning!'},
  {id: 1, text: 'cream puffs!'},
  {id: 2, text: 'I made cinnamon buns!'}
];

var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.send(init);
});

router.post('/', function(req, res, next) {
  console.log('in post')
  console.log(req)
  const newMessage = req.body
  init.push(newMessage)
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(init));

  /*new_user = req.body
  users.push(new_user)
  res.json(new_user)
  */
});


module.exports = router;
