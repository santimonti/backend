import mongoose from 'mongoose';

mongoose
  .connect('mongodb://localhost/angular-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })

  .then((db) => console.log('db connected'))
  .catch((err) => console.log(err));
