class User {

    // private variables
    id;
    username;
    exerciseLog = [];

    // constructor
    constructor(id, username) {
        this.id = id;
        this.username = username;
    }

    // GETTERS
    get id() {
        return this.id;
    }

    get username() {
        return this.username;
    }

    get exerciseCount() {
        return this.exerciseLog.length;
    }

    get exerciseLog() {
        return this.exerciseLog;
    }

    addExercise(exercise) {
        this.exerciseLog.push(exercise)
    }
}

module.exports = User;