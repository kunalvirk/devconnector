const express = require('express');
const router = express.Router();
const passport = require('passport');


// Load models
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// Load Validator 
const validatePost = require('../../validations/post');

// @route : api/post/
// @desc : GET all posts
// @access : public
router.get('/', (req, res) => {
    Post.find()
        .sort({
            date: -1
        })
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json(err))
});


// @route : api/post/:id
// @desc : GET single post by id
// @access : public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({
            nopostfound: "No post found"
        }))
});



// @route : api/post/
// @desc : POST :: Create new post
// @access : private
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {
        errors,
        isValid
    } = validatePost(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    let newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    })

    newPost.save().then(post => res.json(post))
})

// @route : api/post/:id
// @desc : DELETE :: Delete post by id
// @access : private
router.delete('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.user.toString() !== req.user.id) {
                        return res.status(403).json({
                            error: "no access"
                        })
                    }
                    post.remove().then(() => res.json({
                            success: true
                        }))
                        .catch(err => res.status(400).json(err))
                })
        })
        .catch(err => res.status(400).json(err))
})

// @route : api/post/like/:post_id
// @desc : Like a post
// @access : private
router.post('/like/:post_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            Post.findById(req.params.post_id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id) > 0) {
                        return res.json({
                            liked: "You've already liked this post"
                        })
                    }
                    post.likes.unshift({
                        user: req.user.id
                    })
                    post.save().then(() => res.json(post));
                })
                .catch(err => res.status(400).json({
                    err: "Post not found"
                }))
        })
})

// @route : api/post/unlike/:post_id
// @desc : Like a post
// @access : private
router.post('/unlike/:post_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            Post.findById(req.params.post_id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id) === 0) {
                        return res.json({
                            liked: "You've not like this post yet"
                        })
                    }

                    let removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
                    post.likes.splice(removeIndex, 1)
                    post.save().then(() => res.json(post));
                })
                .catch(err => res.status(400).json({
                    err: "Post not found"
                }))
        })
})

// @route : api/post/like/:post_id
// @desc : Like a post
// @access : private
router.post('/comment/:post_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {
        errors,
        isValid
    } = validatePost(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Post.findById(req.params.post_id)
        .then(post => {
            let newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }

            post.comments.unshift(newComment);
            post.save().then(post => res.json(post));

        })
})

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
    '/comment/:id/:comment_id',
    passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {
        Post.findById(req.params.id)
            .then(post => {
                // Check to see if comment exists
                if (
                    post.comments.filter(
                        comment => comment._id.toString() === req.params.comment_id
                    ).length === 0
                ) {
                    return res
                        .status(404)
                        .json({
                            commentnotexists: 'Comment does not exist'
                        });
                }

                // Get remove index
                const removeIndex = post.comments
                    .map(item => item._id.toString())
                    .indexOf(req.params.comment_id);

                // Splice comment out of array
                post.comments.splice(removeIndex, 1);

                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({
                postnotfound: 'No post found'
            }));
    }
);


module.exports = router;