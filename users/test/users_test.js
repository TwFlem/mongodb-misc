const assert = require('assert');
const mongoose = ('mongoose');
const User = require( '../src/user');

describe('mongo user tests', () => {
  const testUser = { name: 'trenton' };
  it('create and save user', (done) => {
    const trenton = new User(testUser);
    trenton.save()
      .then(() => {
        assert(!trenton.isNew);
        done();
      });
  });
  it('query user from database by name', (done) => {
      const trenton = new User(testUser);
      trenton.save()
        .then(() => {
          User.findOne(testUser)
            .then((queriedUser) => {
              assert(queriedUser._id.toString() === trenton._id.toString());
              done();
            });
        });
    });
    it('query user from database by id', (done) => {
      const trenton = new User(testUser);
      trenton.save()
        .then(() => {
          User.findOne({ _id: trenton._id })
            .then((queriedUser) => {
              assert(queriedUser.name === 'trenton');
              done();
            });
        });
    });
  it('remove by model instance', (done) => {
    const trenton = new User(testUser);
    trenton.save()
      .then(() => trenton.remove())
      .then(() => User.findOne({ _id: trenton._id }))
      .then((user) => {
        assert(!user);
        done();
      });
  });
    it('remove multiple users by class', (done) => {
      const trenton1 = new User(testUser);
      const trenton2 = new User(testUser);
      const trenton3 = new User(testUser);
      trenton1.save()
        .then(() => trenton2.save())
        .then(() => trenton3.save())
        .then(() => User.remove(testUser))
        .then(() => User.find(testUser))
        .then((queriedUsers) => {
          assert(queriedUsers.length === 0);
          done();
        });
    });
  it('remove one user by attribute', (done) => {
    const trenton = new User(testUser);
    trenton.save()
      .then(() => User.findOneAndRemove(testUser))
      .then(() => User.find(testUser))
      .then((queriedUsers) => {
        assert(queriedUsers.length === 0);
        done();
      });
  });
  it('remove one user by id', (done) => {
    const trenton = new User(testUser);
    trenton.save()
      .then(() => User.findByIdAndRemove(trenton._id))
      .then(() => User.find(testUser))
      .then((queriedUsers) => {
        assert(queriedUsers.length === 0);
        done();
      });
  });
});
