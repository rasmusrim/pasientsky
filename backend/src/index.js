const express = require('express')
const mongoose = require('mongoose');
const app = express()

const Patient = require ('./models/patient');

const connectDb = () => {
    console.log('Connecting to DB...');
    return mongoose.connect('mongodb://localhost:27017/pasientsky', { useNewUrlParser: true, useUnifiedTopology: true });
  };


connectDb().then(async () => {

    app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);
});


app.get('/patients', (req, res) => {
    
    
    return res.send('GET HTTP method on user resource');
  });
  app.post('/patients', async (req, res) => {
    const patient = new Patient({
        ID: 1,
        name: 'Rasmus Rimestad',
        birthday: '1982-08-15',
        phone: '93296176'
      });
      await patient.save();

    return res.send('POST HTTP method on user resource');
  });
  app.put('/patients', (req, res) => {
    return res.send('PUT HTTP method on user resource');
  });
  app.delete('/patients', (req, res) => {
    return res.send('DELETE HTTP method on user resource');
  });