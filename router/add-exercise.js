const database = require("../data/DataBase");
const Exercise = require('../data/Exercise');
const router = require("express").Router();

router.post("/", (req, res) => {
    // Get all the details provided in the form
    let userId = req.body.userId;
    let description = req.body.description;
    let duration = req.body.duration;
    let date = req.body.date;

    // Get the user from the database
    let user = database.getUser(userId);

    // user id incorrect or not provided
    if (!user) {
        let errMsg = `Cast to date ObjectId for value "${userId}" at path "_id" for model "Users"`;
        res.end(errMsg);
        return;
    }

    // description not provided
    if (!description) {
        let errMsg = "Path `description` is required.";
        res.end(errMsg);
        return;
    }

    // duration not provided
    if (!duration) {
        let errMsg = "Path `duration` is required.";
        res.end(errMsg);
        return;
    }

    // duration not an int i.e. parseInt returns NaN
    if (!parseInt(duration) < 1 && !parseInt(duration)) {
        let errMsg = `Cast to Number failed for value "${duration}" at path "duration"`;
        res.end(errMsg);
        return;
    }

    // duration provided is less than 1
    if(parseInt(duration) < 1) {
        let errMsg = `duration too short`;
        res.end(errMsg);
        return;
    }
    
    // date not provided
    if (!date) {
        // add current date
        date = new Date();
    } else {

        // convert provided date to Date Object
        date = new Date(date);
    }

    // date provided is invalid or not in format yyyy-mm-dd
    if (date.toString() === new Date("").toString()) {
        let errMsg = `Cast to date failed for value "${req.body.date}" at path "date"`;
        res.end(errMsg);
        return;
    }

    // create exercise object if everything is right with values provided
    let exercise = new Exercise(
        userId,
        description,
        duration,
        date
    );
    
    // add exercise object to the users exercise list
    user.addExercise(exercise);

    // update the new user in the database
    database.addUser(userId, user);

    // get the updated user from the database
    let addedUser = database.getUser(userId);

    // get the latest added exercise
    let addedUserLatestExercise = addedUser.exerciseLog[addedUser.exerciseCount - 1].data;
    
    res.json({
        "_id": addedUser.id,
        "username": addedUser.username,
        "date": addedUserLatestExercise.date.toDateString(),
        "description": addedUserLatestExercise.description
    })

});

module.exports = router;
