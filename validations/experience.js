const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateExperience(data) {

    let errors = {}

    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if (Validator.isEmpty(data.title)) {
        errors.title = "Please enter the job title"
    }
    if (Validator.isEmpty(data.company)) {
        errors.company = "Please enter the name of company/organisation"
    }
    if (Validator.isEmpty(data.from)) {
        errors.from = "Please enter the date you started the job"
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}