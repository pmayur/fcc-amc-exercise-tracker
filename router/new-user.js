const router = require('express').Router();
const User = require('../data/User');
const database = require('../data/DataBase');
const { v4: uuidv4 } = require('uuid');
const { isUserNameUnique } = require('../data/DataBase');

router.post('/', (req, res) => {
    
    let username = req.body.username;

    if( isUserNameUnique(username)) {

        let id = uuidv4();
    
        let newUser = new User(id, username)
    
        database.addUser(id, newUser);
    
        let addedUser = database.getUser(id);
    
        res.json({
            "username": addedUser.username,
            "_id": addedUser.id
        })

    } else {
        res.json({
            "error": "username taken"
        })
    }

})

module.exports = router;