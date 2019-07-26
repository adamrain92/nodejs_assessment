const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app.js');

describe('App', function(){

    it('Register one or more students to a specified teacher', (done) => {
        request(app).post('/api/register')
            .send({
            "teacher": "teacher2@gmail.com",
            "students": [
                "student1@gmail.com",
                    "student2@gmail.com"
            ]
        })
        .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('message');
        expect(body.message).to.equal('Registration completed');
        done();
        })
        .catch((err) => done(err));
    });

    it('Retrieve a list of students common to a given list of teachers ', (done) => {
    request(app).get('/api/commonstudents?teacher=teacher1@gmail.com&teacher=teacher2@gmail.com')
        .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('students');
        expect(body.students).to.be.an('array');
        done();
        })
        .catch((err) => done(err));
    });

    it('Suspend a specified student', (done) => {
        request(app).post('/api/suspend')
            .send({
                "student": "student2@gmail.com"
            })
        .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('message');
        expect(body.message).to.equal('Student have been suspended.');
        done();
        })
        .catch((err) => done(err));
    });

    it('Retrieve a list of students who can receive a given notification', (done) => {
        request(app).post('/api/retrievefornotifications')
            .send({
                "teacher":  "teacher2@gmail.com",
                "notification": "Hello students! @student2@gmail.com @student1@gmail.com"
            })
        .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('recipients');
        expect(body.recipients).to.be.an('array');
        done();
        })
        .catch((err) => done(err));
    });
});

