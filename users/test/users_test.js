const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost');
  mongoose.connection
    .on('open', () => console.log('success'))
    .catch('error', (error) => console.warn(error))