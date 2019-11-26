const { check, validationResult } = require('express-validator');
const Patient = require('../models/patient');

/**
 * POST request
 */
exports.post = async function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let patient;
    if (req.params.id) {
        patient = await Patient.findOne({id: req.params.id})
    } else {
        patient = new Patient();
    }
    
    
    const payload = req.body

    patient.name = payload.name;
    patient.dob = payload.dob;
    patient.phone = payload.phone;
    patient.email = payload.email;
    patient.medications = payload.medications;

    await patient.save();

    res.json({ id: patient.id });

}

/**
 * Returns an array of validations to run on a POST request.
 */
exports.getPostValidation = function () {
    return [
        check('email').exists().isEmail(),
        check('name').exists().isLength({ min: 3 }),
        check('phone').exists().isInt().isLength({ min: 8, max: 8 })
    ]
}

/**
 * GET request with no parameters.
 */
exports.get = async function (req, res) {
    let query = req.query.query;
    let re = new RegExp(query, 'i')

    Patient.find().or([
        { name: re },
        { phone: re },
        { email: re }
    ]).sort({ name: 1 }).limit(100)
        .then(patients => { res.json(patients); })
        .catch(error => {
            res.status(422).json({ errors: error.array() })
        });
}

/**
 * GET request with ID
 */
exports.getOne = async function (req, res) {
    let id = req.params.id;

    Patient.findOne({ id: id}).then(response => {
        res.json(response);
    });
}

/**
 * DELETE request
 */
exports.delete = async function (req, res) {
    let id = req.query.id;
    Patient.deleteOne({ id: id }, function (err, result) {


        if (err) {
            res.status(500).json({ success: 0 });
        } else {
            if (result.deletedCount === 0) {
                res.status(404).json({ success: 0 });

            } else {

                res.status(200).json({ success: 1 });

            }
        }

    });
}

module.exports = exports;
