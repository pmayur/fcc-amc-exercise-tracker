class DataBase {
    
    #store = new Map();

    addUser = (id, newUser) => {
        // store userid as key, user object as value
        this.#store.set(id, newUser);
    }

    getUser = (id) => {
        // get User object from id
        return this.#store.get(id);
    }

    // checks if the map already contains the username
    isUserNameUnique = (username) => {

        // set iterator to move through store map
        const iterator = this.#store[Symbol.iterator]();

        // item consists of [key, value] for every elem in iterator
        for (const item of iterator) {

            // if any username value is found, exit
            if( item[1].username == username) {
                return false;
            }
        }
        return true;
    }

    get size() { 
        return this.#store.size
    }
}

let database = new DataBase();

module.exports = database;