const express = require('express');
const Admin = require('../models/AdminModel');
require('dotenv').config();
const Joi = require('@hapi/joi'); //For Check datas
const bcrypt = require('bcrypt'); //For encrypt password
const jwt = require('jsonwebtoken'); //For generate acces token




const adminRegisterSchema = Joi.object({ //For Check datas
    name: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(6).max(99).required()
});
const adminLoginSchema = Joi.object({ //For Check datas
    name: Joi.string(),
    password: Joi.string()
});

const router = express.Router(); // import the router

router.post('/register', (req, res) => { // login route
    res.send('Please use this url : /register_token=adminRegisterToken ');
})

router.post(`/register_token=${process.env.ADMIN_REGISTER_TOKEN}`, (req, res) => { // register route

    const { error } = adminRegisterSchema.validate(req.body); // validate the request body
    if(error) { // if error
        res.status(400).send(error.details[0].message); // send the error
        return;
    }
    else{
        const salt = bcrypt.genSaltSync(10); // generate salt
        const hashedPassword = bcrypt.hashSync(req.body.password, salt); // encrypt password

        const admin = new Admin({...req.body,password:hashedPassword}); // create a new admin

        admin.save() // save the admin
        .then(() => {
            const tkn = jwt.sign({_id: admin._id}, process.env.ADMIN_LOGIN_JWT); // generate acces token
               
            res
           .header('Authorization',tkn)
           .json({ // send the admin
               message: 'Admin Created Successful: ' + admin.name,
               accesToken: tkn 
           }); 
            
        }).catch((err) => {
            res.json(err);
        })
    }  
})

router.post('/login', (req, res) => { // login route
    const {name,password} = req.body;
    const { error } = adminLoginSchema.validate(req.body); // validate the request body
    if(error) { // if error
        res.status(400).send(error.details[0].message); // send the error
        return;
    }
    else{
        Admin.findOne({name}) // find the admin
        .then((admin) => {
           if(!admin) { // if admin not found
               res.status(400).send('Invalid name or password!'); //name is wrong
               return;
           }
           else {
               const validPassword = bcrypt.compareSync(password, admin.password); // compare the password
               if(!validPassword) { // if password is not valid
                   res.status(400).send('Invalid name or password!'); // password is wrong
                   return;
               }
               else { // if password and name is valid
                    const tkn = jwt.sign({_id: admin._id}, process.env.ADMIN_LOGIN_JWT); // generate acces token
                   
                    res
                   .header('Authorization',tkn)
                   .json({ // send the admin
                       message: 'Login Successful!',
                       accesToken: tkn 
                   }); 
               }
           }
        }).catch((err) => { // if error
            res 
            .status(400)
            .send('Invalid name or password!');
        })
    }

   
})




module.exports = router;