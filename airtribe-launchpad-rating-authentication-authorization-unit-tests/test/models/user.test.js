var User = require("../../src/models/user");
var bcrypt = require("bcrypt");
const expect = require('chai').expect;

describe('Creating documents in MongoDB', () => {
  it('Creates a New User Successfully', (done) => {
    const user = new User({
      fullName: 'Test User',
      email: 'test1234@gmail.com',
      role: 'admin',
      password: bcrypt.hashSync('test1234', 8)
    });
    user.save().then(user => {
      expect(!user.isNew).equal(true);
      done();
    });
  }).timeout(10000);

  it('validates the email of the user', (done) => {
    const user = new User({
      fullName: 'Test User',
      email: 'test@1234@gmail.com',
      role: 'admin',
      password: bcrypt.hashSync('test1234', 8)
    });
    user.save().catch((err) => {
      expect(err._message).equal('User validation failed');
      done();
    });
  }).timeout(5000);


  it('validates the role of the user', (done) => {
    const user = new User({
      fullName: 'Test User',
      email: 'test@1234@gmail.com',
      role: 'test',
      password: bcrypt.hashSync('test1234', 8)
    });
    user.save().catch((err) => {
      expect(err._message).equal('User validation failed');
      done();
    });
  }).timeout(5000);

  it('validates the fields of the user', (done) => {
    const user = new User({
      email: 'test@1234@gmail.com',
      role: 'test',
      password: bcrypt.hashSync('test1234', 8)
    });
    user.save().catch((err) => {
      expect(err._message).equal('User validation failed');
      done();
    });
  }).timeout(5000);
});