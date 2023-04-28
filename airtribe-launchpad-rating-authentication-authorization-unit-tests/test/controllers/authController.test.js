process.env.NODE_ENV = 'test';

var User = require("../../src/models/user");
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../../src/app');
const expect = require('chai').expect;

describe('verifies signup flow' , () => {
  it("successful singup", (done) => {
    let singupBody = {
      fullName: 'test name',
      email: 'test12345@gmail.com',
      role: 'admin',
      password: 'test1234'
    };
    chai.request(server).post('/register').send(singupBody).end((err, res) => {
      expect(res.status).equal(200);
      expect(res.body.message).equal('User Registered successfully');
      done();
    });
  });

  it("verifies singup flow failing because of email validation", (done) => {
    let singupBody = {
      fullName: 'test name',
      email: 'test@12345@gmail.com',
      role: 'admin',
      password: 'test1234'
    };
    chai.request(server).post('/register').send(singupBody).end((err, res) => {

      expect(res.status).equal(500);
      expect(res.body.message.message).equal('User validation failed: email: test@12345@gmail.com is not a valid email!');
      expect(res.body.message._message).equal('User validation failed');
      done();
    });
  });

  it("verifies singup flow failing because of role validation", (done) => {
    let singupBody = {
      fullName: 'test name',
      email: 'test12345@gmail.com',
      role: 'test',
      password: 'test1234'
    };
    chai.request(server).post('/register').send(singupBody).end((err, res) => {

      expect(res.status).equal(500);
      expect(res.body.message.message).equal('User validation failed: role: `test` is not a valid enum value for path `role`.');
      expect(res.body.message._message).equal('User validation failed');
      done();
    });
  });

  it("verifies singup flow failing because of incomplete properties passed", (done) => {
    let singupBody = {
      email: 'test12345@gmail.com',
      role: 'admin',
      password: 'test1234'
    };
    chai.request(server).post('/register').send(singupBody).end((err, res) => {
      expect(res.status).equal(500);
      expect(res.body.message.message).equal('User validation failed: fullName: fullname not provided ');
      expect(res.body.message._message).equal('User validation failed');
      done();
    });
  });
});

describe('verifies the sign in flow', () => {

  beforeEach((done) => {
    console.log('running inside the signin flow');
    let singupBody = {
      fullName: 'test name',
      email: 'test12345@gmail.com',
      role: 'admin',
      password: 'test1234'
    };
    chai.request(server).post('/register').send(singupBody).end((err, res) => {
      done();
    });
  });

  it("successful signin", (done) => {
    let singupBody = {
      fullName: 'test name',
      email: 'test12345@gmail.com',
      role: 'admin',
      password: 'test1234'
    };
    chai.request(server).post('/register').send(singupBody).end((err, res) => {
        let signInBody = {
          'email': 'test12345@gmail.com',
          'password': 'test1234'
        }
        chai.request(server).post('/signin').send(signInBody).end((err, res) => {
          expect(res.status).equal(200);
          expect(res.body.user.email).equal('test12345@gmail.com');
          expect(res.body.user.fullName).equal('test name');
          expect(res.body.message).equal('Login successfull');
          expect(res.body).to.have.property('accessToken');
          done();
        });
    });
  });

  it("Invalid password while signing in", (done) => {
    let singupBody = {
      fullName: 'test name',
      email: 'test12345@gmail.com',
      role: 'admin',
      password: 'test1234'
    };
    chai.request(server).post('/register').send(singupBody).end((err, res) => {
        let signInBody = {
          'email': 'test12345@gmail.com',
          'password': 'test12345'
        }
        chai.request(server).post('/signin').send(signInBody).end((err, res) => {
          expect(res.status).equal(401);
          expect(res.body.message).equal('Invalid Password!');
          expect(res.body.accessToken).to.be.null;
          done();
        });
    });
  });

  it("User does not exist while signing in", (done) => {
    let singupBody = {
      fullName: 'test name',
      email: 'test12345@gmail.com',
      role: 'admin',
      password: 'test1234'
    };
    chai.request(server).post('/register').send(singupBody).end((err, res) => {
        let signInBody = {
          'email': 'someOtherTest@gmail.com',
          'password': 'test12345'
        }
        chai.request(server).post('/signin').send(signInBody).end((err, res) => {
          expect(res.status).equal(404);
          expect(res.body.message).equal('User Not found.');
          expect(res.body.accessToken).to.be.undefined;
          done();
        });
    });
  });
})