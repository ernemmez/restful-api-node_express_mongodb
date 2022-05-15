const express = require('express');

const User = require('../models/UserModel');

const router = express.Router();

//FETCH USERS
router.get('/users', (req, res) => { //users route
    User.find()
    .then(users => {
        res.json(users);
    }).catch(err => {
        res.send(err);
    })
})
router.get('/users/:id', (req, res) => { //users/:id route
    User.findById(req.params.id)
    .then(user => {
        res.json(user);
    }).catch(err => {
        res.send(err);
    })
})


//CREATE USERS
router.post('/users', (req, res) => { //user create route
    const newUser = new User({ //create new user
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        country: req.body.country,
        about: req.body.about,
        account_created_at: req.body.account_created_at,
        account_updated_at: req.body.account_updated_at,
        account_last_login: req.body.account_last_login,
        user_avatar_url: req.body.user_avatar_url,
        user_cover_url: req.body.user_cover_url,
        verification_question: req.body.verification_question,
        verification_answer: req.body.verification_answer
    }); 
    newUser.save().then(() => { //save to new user database
            console.log('User Created: ' + req.body.username);
            res.send('User Created: ' + req.body.username);
        }).catch((err) => {
            console.log(err);
        }
    )
    res.json({ //send response
        message: 'User Created: ' + req.body.username,
        createdUser: newUser
    });
})


//UPDATE USERS
router.put('/users/:id', (req, res) => { //user update route
    User.findByIdAndUpdate(req.params.id, {
        $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            country: req.body.country,
            about: req.body.about,
            user_avatar_url: req.body.user_avatar_url,
            user_cover_url: req.body.user_cover_url,
            verification_question: req.body.verification_question,
            verification_answer: req.body.verification_answer
        }
    })
    .then(() => {
        res.send('User Updated' + req.body.username);
    }).catch((err) => {
        res.send(err);
    })
})


//DELETE USERS
router.delete('/users/:id', (req, res) => { //user delete route
    User.findByIdAndRemove(req.params.id)
    .then(() => {
        res.send('User Deleted');
    }).catch((err) => {
        res.send(err);
    })
})



module.exports = router;