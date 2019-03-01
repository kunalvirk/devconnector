const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const secretKey = require('../../config/keys').secretOrKey;

// Validations
const registerValidator = require('../../validations/register');
const loginValidator = require('../../validations/login');

// Load user model
const User = require('../../models/User');

// @route : api/user/test/
// @desc : Test route
// @access : public
router.get('/test/', (req, res) => res.json({
    msg: "User test route"
}));


// @route : api/user/signup/
// @desc : Create new user route
// @access : public
router.post('/signup/', (req, res) => {
    const {
        errors,
        isValid
    } = registerValidator(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (user) {
                errors.email = "User already exist!!!";
                errors.success = false;
                return res.status(400).json(errors)
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'PG',
                    d: 'mm'
                })
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash
                        newUser.save()
                            .then(user => {
                                res.status(201).json({
                                    success: true,
                                    newUser: user
                                })
                            })
                            .catch(err => console.log(err))
                    })
                })

            }
        })
});


// @route : api/user/login/
// @desc : Login/Verify user
// @access : public
router.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    const {
        errors,
        isValid
    } = loginValidator({
        email,
        password
    });
    if (!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({
        email
    }, (err, user) => {
        if (!user) {
            errors.success = false;
            errors.email = "No email found with this user"
            return res.status(400).json(errors)
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {

            if (!isMatch) {
                errors.password = "The password you entered is not correct";
                errors.success = false;

                return res.status(403).json(errors)
            }

            // User is matched here
            // Create payload
            const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }

            jwt.sign(payload, secretKey, {
                expiresIn: 3600
            }, (err, token) => {
                res.status(200).json({
                    success: true,
                    msg: "Successful",
                    token: 'Bearer ' + token
                })
            })

        })
    })
})


// @route : api/user/current/
// @desc : Get/Veryify current user
// @access : private
router.get('/current', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.json({
        success: true,
        msg: "Logged In",
        userDetails: {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        }
    })
})

module.exports = router;