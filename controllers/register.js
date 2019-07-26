const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


exports.register = function(req, res, next) {
  var register = [];
  req.body.students.forEach(student => {
    register.push({
      teacherEmail: req.body.teacher,
      studentEmail: student
    });
  });
  
  models.Register.bulkCreate(register).then(function() {
  res.json({
    message: "Registration completed"
  });
  })
};

exports.commonStudents = function(req, res, next) {
  var teachers = req.param('teacher'); 

  if(teachers == undefined){
    res.json({"message": "Teacher field is require"});
  }

  teachers = ( typeof teachers != 'undefined' && teachers instanceof Array ) ? teachers : [teachers];

  var teacherObj = [];
  teachers.forEach(teacher => {
    teacherObj.push({
      teacherEmail: teacher
    });
  });
  
  models.Register.findAll({
    attributes: ['studentEmail'],
    raw: true,
    where: {
      [Op.or]: teacherObj,
    },
    group: 'studentEmail',
    having: Sequelize.where(Sequelize.fn('count', Sequelize.col('studentEmail')), '=', teacherObj.length)
  }).then(register => {
    var students =register.map(register => register.studentEmail)
    res.json({"students":students});
    });
};

exports.notificationList = function(req, res, next) {
  var mentionedEmails = extractEmails(req.body.notification);
 
  models.Register.findAll({
      attributes: ['studentEmail'],
      raw: true,
      where: {
      studentEmail:{
        [Op.notIn]: mentionedEmails
      },
        teacherEmail: req.body.teacher
      },
    }).then(student => {
      var students =student.map(student => student.studentEmail)
      res.json({"recipients":students.concat(mentionedEmails)});
      
      });
};

function extractEmails ( text ){
  var emails = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
  return (emails == null)?[]:emails;
}