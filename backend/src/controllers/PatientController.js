const { check, validationResult } = require('express-validator');
const Patient = require('../models/patient');

exports.post = async function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const payload = req.body
    console.log(payload);
    const patient = new Patient({
        name: payload.name,
        birthday: payload.dob,
        phone: payload.phone,
        email: payload.email
    });
    await patient.save();

    return res.send('POST HTTP method on user resource');

}

exports.getPostValidation = function () {
    return [
        check('email').exists().isEmail(),
        check('name').exists().isLength({ min: 3 }),
        check('phone').exists().isInt().isLength({ min: 8, max: 8 })
    ]
}

module.exports = exports;

/*app.get('/patients', (req, res) => {


    return res.send('GET HTTP method on user resource');
  });

  app.put('/patients', (req, res) => {
    return res.send('PUT HTTP method on user resource');
  });

  app.delete('/patients', (req, res) => {
    return res.send('DELETE HTTP method on user resource');
  });*/