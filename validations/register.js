const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function registerValidation(data) {

    let errors = {};

    if (!Validator.isLength(data.name, {
            min: 2,
            max: 40
        })) {
        errors.name = "Name must be of min 2 chars and max 40 chars";
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name must be specified"
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Please enter a valid email id"
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email id is required"
    }
    if (!Validator.isLength(data.password, {
            min: 6,
            max: 20
        })) {
        errors.password = "Password must be in between 6 and 20 chars"
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "Enter a strong password"
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Password don't match"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}