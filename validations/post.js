const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validatePost(data) {
    let errors = {}

    data.text = !isEmpty(data.text) ? data.text : '';


    if (!Validator.isLength(data.text, {
            min: 10,
            max: 100
        })) {
        errors.text = "Post should be in between 10 to 100 chars"
    }

    if (Validator.isEmpty(data.text)) {
        errors.text = "Put some content in your post"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}