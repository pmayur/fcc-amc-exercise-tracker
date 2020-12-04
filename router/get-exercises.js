const router = require("express").Router();
const database = require("../data/DataBase");

router.get("/", (req, res) => {

    // get details provided in the query
    let userId = req.query.userId;
    let limit = req.query.limit;
    let fromDate = req.query.from;
    let toDate = req.query.to;

    // userId not provided
    if (!userId) {
        return res.status(400).end("Unknown userId");
    }

    // find user based on the userId
    let user = database.getUser(userId);

    // user not found
    if (!user) {
        let errMsg = `Cast to ObjectId failed for value "${userId}" at path "_id" for model "Users"`
        return res.status(400).end(errMsg);
    }

    // limit not given, incorrectly given or 0 given
    if (!parseInt(limit) || parseInt(limit) > user.exerciseCount) {
        limit = user.exerciseCount
    }

    // convert from to date object
    let from = new Date(fromDate);
    // from date incorrect or not given
    if ( from.toString() === new Date("").toString() ) {
        // minimum possible date
        from = new Date(-8640000000000000);
    }

    // convert to date to date object
    let to = new Date(toDate);
    // to date incorrect or not given
    if ( to.toString() === new Date("").toString() ) {
        // maximum possible date
        to = new Date(8640000000000000);
    }

    // get all exercises for the user
    let exercises = user.exerciseLog;

    // sort exercises by date
    let sortedExercises = exercises.sort(function(a,b){
        return b.date - a.date;
    });

    // empty array to store exercises queried
    let requiredList = [];

    let index = 0; // keeps track of exercises index while iterating

    // keep traversing till index end is reached or limit of query is reached
    while ( index < exercises.length && limit > 0  ) {

        // exercise object for the given iteration
        let exercise = sortedExercises[index];

        // checks if exercise date is within to and from date
        if ( exercise.date >= from && exercise.date <= to ) {
            requiredList.push({
                "description": exercise.description,
                "duration": exercise.duration,
                "date": exercise.date.toDateString()
            });
            limit --;
        }

        index ++;
    }

    // field checks if user provided valid date
    let isFromInvalid = new Date(fromDate).toString() === new Date("").toString()
    let isToInvalid = new Date(toDate).toString() === new Date("").toString()

    res.json({
        "_id": user.id,
        "username": user.username,
        "count": requiredList.length,
        "from": isFromInvalid ? undefined : new Date(fromDate).toDateString(),
        "to": isToInvalid ? undefined : new Date(toDate).toDateString(),
        "log" : requiredList
    })    
});

module.exports = router;
