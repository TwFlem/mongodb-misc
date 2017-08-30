const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(() => {
  mongoose.connect('mongodb://localhost/users_test', {
    useMongoClient: true
  })
    .once('open', () => {})
    .on('error', (error) => console.warn(error));
});

  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });