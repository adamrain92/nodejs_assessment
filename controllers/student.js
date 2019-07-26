const models = require('../models');

exports.suspend = function(req, res, next) {

  var studentParam =  req.body.student; 
  if(studentParam == undefined){
    res.json({"message": "Student field is require"});
  }

  models.Student.update({
      suspend:1
  }, { 
      where: {
        email:  req.body.student
      }
  }).then(result => {
    if(result == 1){
      res.json({ message: "Student have been suspended." });
    }else{
      res.json({ error: "Student not found." });
    }
  })
};