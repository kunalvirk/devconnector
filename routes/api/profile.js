const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Profile model
const Profile = require('../../models/Profile');
// Load user model
const User = require('../../models/User');

// Load validator 
const validateProfileInput = require('../../validations/profile');
const validateEducation = require('../../validations/education');
const validateExperience = require('../../validations/experience');

// @route : api/profile
// @desc : Get user profile
// @access : private
router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const errors = {};
    Profile.findOne({
            user: req.user.id
        })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = "There is no profile created"
                return res.status(404).json(errors);
            }
            res.status(200).json(profile);
        })
        .catch(err => console.log(err))
});


// @route : api/profile
// @desc : Get user profile
// @access : private
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    const {
        errors,
        isValid
    } = validateProfileInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const profileFields = {}
    profileFields.user = req.user.id;

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    // Get skills
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }

    // Get social
    profileFields.social = {}
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook

    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            if (profile) {
                // If profile exists, update it
                Profile.findOneAndUpdate({
                        user: req.user.id
                    }, {
                        $set: profileFields
                    })
                    .then(profile => res.status(200).json(profile))
            } else {
                // Create profile
                Profile.findOne({
                        handle: profileFields.handle
                    })
                    .then(profile => {
                        if (profile) {
                            errors.handleexists = "Handle already exists";
                            return res.status(400).json(errors)
                        }
                        new Profile(profileFields).save().then(profile => res.json(profile))
                    })
            }

        })

});

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
    let errors = {};
  
    Profile.find()
            .populate('user', ['name', 'avatar'])
            .then(profiles => {
                if (!profiles) {
                errors.noprofile = 'There are no profiles';
                return res.status(404).json(errors);
                }
        
                res.json(profiles);
            })
            .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
  });

// @route : api/profile/handle/:handle
// @desc : Get user profile by handle
// @access : public
router.get('/handle/:handle', (req, res) => {
    let errors = {};
    Profile.findOne({
            handle: req.params.handle
        })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = "No profile found for this handle" + req.params.handle;
                return res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch(err => console.log(err))
})

// @route : api/profile/user/:user_id
// @desc : Get user profile by user id
// @access : public
router.get('/user/:user_id', (req, res) => {
    let errors = {};
    Profile.findOne({
            user: req.params.user_id
        })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = "No profile found for this handle" + req.params.handle;
                return res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch(err => console.log(err))
})

// @route : api/profile/experience
// @desc : POST user experience
// @access : private
router.post('/experience', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {
        errors,
        isValid
    } = validateExperience(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
    }
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }
            profile.experience.unshift(newExp);
            profile.save().then(profile => {
                res.status(201).json(profile)
            })
        })
})

// @route : api/profile/education
// @desc : POST user education
// @access : private
router.post('/education', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {
        errors,
        isValid
    } = validateEducation(req.body)
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            const newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.from,
                current: req.body.current,
                description: req.body.description
            }
            profile.education.unshift(newEdu);

            profile.save().then(profile => {
                res.status(201).json(profile)
            })
        })
})

// @route : api/profile/education/:edu_id
// @desc : DELETE user education
// @access : private
router.delete('/education/:edu_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            let removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
            profile.education.splice(removeIndex, 1);

            profile.save().then(profile => res.json(profile))
        })
        .catch(err => res.status(400).json(err))
});

// @route : api/profile/experience/:exp_id
// @desc : DELETE user experience
// @access : private
router.delete('/experience/:exp_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            let removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
            profile.experience.splice(removeIndex, 1);

            profile.save().then(profile => res.json(profile))
        })
        .catch(err => res.status(400).json(err))
});

router.delete('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOneAndRemove({
            user: req.user.id
        })
        .then(() => User.findOneAndRemove({
            _id: req.user.id
        }).then(() => res.json({
            success: true
        })))
        .catch(err => res.status(400).json(err))
})
module.exports = router;