const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


exports.register = function(req, res, next) {

  const teacher = models.Teacher.findOne({ where: {email: req.body.teacher} });
  const students = models.Student.findAll({ where:{email: req.body.students} });

  Promise
    .all([teacher, students])
    .then(responses => {

      var register = [];
      responses[1].forEach(student => {
        register.push({
          teacherId: responses[0].id,
          studentId: student.id
        });
      });
      models.Register.bulkCreate(register).then(function() {
        res.json({
          message: "Registration completed"
        });
      })
  
    })
    .catch(err => {
        console.log(err);
    });
};

exports.commonStudents = function(req, res, next) {
  var teachers = req.param('teacher'); 

  if(teachers == undefined){
    res.json({"message": "Teacher field is require"});
  }

  teachers = ( typeof teachers != 'undefined' && teachers instanceof Array ) ? teachers : [teachers];

  models.Teacher.findAll({
    attributes: ['id'],
    where: {email: teachers}
  }).then(teacher => {
    var teacher = teacher.map(teacher => teacher.id)

      models.Register.findAll({
        attributes: ['studentId'],
        raw: true,
        where: {
          [Op.or]: {teacherId: teacher},
        },
        group: 'studentId',
        having: Sequelize.where(Sequelize.fn('count', Sequelize.col('studentId')), '=', teacher.length)
      }).then(register => {
        var students =register.map(register => register.studentId)

        models.Student.findAll({
          attributes: ['email'],
          where: {id: students}
        }).then(student => {
          var students = student.map(student => student.email)
          res.json({"students":students});
        });
      });

    });
  
};

exports.notificationList = function(req, res, next) {
  var mentionedEmails = extractEmails(req.body.notification);
 
  const teacher = models.Teacher.findOne({ where: {email: req.body.teacher} });
  const students = models.Student.findAll({ where:{email: mentionedEmails} });

  Promise
  .all([teacher, students])
  .then(responses => {
    var studentsId = responses[1].map(responses => responses.id);

    models.Register.findAll({
      attributes: ['studentId'],
      raw: true,
      where: {
        studentId:{
        [Op.notIn]: studentsId
      },
        teacherId: responses[0].id
      },
    }).then(students => {
      recipients =students.map(student => student.studentId).concat(studentsId);

        models.Student.findAll({
          attributes: ['email'],
          where: {id: recipients}
        }).then(student => {
          var students = student.map(student => student.email)
          res.json({"recipients":students});
        });
      });
  })
  .catch(err => {
      console.log(err);
  });


};

function extractEmails ( text ){
  var emails = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
  return (emails == null)?[]:emails;
}