class Exercise {

    // private variables
    #usersId;
    #description;
    #duration;
    #date;

    // constructor
    constructor(usersId, description, duration, date) {
        this.#usersId = usersId;
        this.#description = description;
        this.#duration = duration;
        this.#date = date;
    }

    // GETTERS
    get data() {
        return {
            "id": this.#usersId,
            "description": this.#description,
            "duration": this.#duration,
            "date": this.#date
        }
    }

    get date() {
        return this.#date
    }

    get description() {
        return this.#description
    }

    get duration() {
        return this.#duration
    }
}

module.exports = Exercise;