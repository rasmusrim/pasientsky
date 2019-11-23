const express = require('express')
const mongoose = require('mongoose');

var cors = require('cors');

const app = express()
app.use(cors());
app.use(express.json())

const PatientController = require('./controllers/PatientController');


const connectDb = () => {
  console.log('Connecting to DB...');
  return mongoose.connect('mongodb://localhost:27017/pasientsky', { useNewUrlParser: true, useUnifiedTopology: true });
};


connectDb().then(async () => {
  app.listen(3000, () =>
    console.log('Example app listening on port 3000!'),
  );
});

app.post('/patients', PatientController.getPostValidation(), async (req, res) => {
  PatientController.post(req, res);

});


