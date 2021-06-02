// implement your posts router here
const express = require('express');

const router = express.Router();

const Posts = require('./posts-model');

router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error retrieving posts'
            });
        });
});

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if (post) {
            res.status(200).json(post);
        }
        else {
            res.status(404).json({
                message: 'Post Not Found'
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Error finding post'
        })
    })
})

router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
    .then(comments => {
        if (comments.length > 0) {
            res.status(200).json(comments)
        }
        else {
            res.status(404).json({
                message: 'No comments found on this post'
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Error retrieving comments'
        })
    })
})

router.post('/', (req, res) => {
    Posts.insert(req.body)
        .then(newPost => {
            res.status(201).json(newPost)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error adding new post',
                error: err.message
            })
        })
})

router.put('/:id', (req, res) => {
    const changes = req.body;
    Posts.update(req.params.id, changes)
        .then(updatedPost => {
            if (updatedPost) {
                res.status(200).json(updatedPost)
            }
            else {
                res.status(404).json({
                    message: 'Post could not be found'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error updating Post'
            })
        })
})

router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
})

module.exports = router;