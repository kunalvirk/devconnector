const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateEducation(data) {

    let errors = {}

    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if (Validator.isEmpty(data.school)) {
        errors.school = "Please enter the school name"
    }
    if (Validator.isEmpty(data.degree)) {
        errors.degree = "Please enter the name of degree"
    }
    if (Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = "Please enter the name of degree"
    }
    if (Validator.isEmpty(data.from)) {
        errors.from = "Please enter the date you started the school"
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}