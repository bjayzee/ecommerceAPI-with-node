const User = require('../models/user')


exports.userRegistration = (req, res) =>{

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    user.save().then(data =>{
        res.status(201).json(data);
    }).catch(err =>{
        res.status(400).json({error: err.message})
    });    
}