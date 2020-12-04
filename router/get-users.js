const router = require("express").Router();
const database = require("../data/DataBase");

router.get('/', (req, res) => {
    let usersList = database.allUsersList;

    res.send(usersList)
})

module.exports = router;
