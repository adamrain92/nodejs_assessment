var express = require('express');
var router = express.Router();

let register = require('../controllers/register');
let student = require('../controllers/student');

router.post('/register', register.register);
router.get('/commonstudents', register.commonStudents);
router.post('/suspend', student.suspend);
router.post('/retrievefornotifications', register.notificationList);

module.exports = router;
