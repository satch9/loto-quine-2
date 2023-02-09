const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./bingo.db")


class User {

    constructor(id, username, firstName, lastName, email, password, token) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.token = token;
    }

    // method to create a new user to the database
    static create(user) {
        console.log("user Model", user)
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO users (username, firstName, lastName, email, password, token) VALUES (?, ?, ?, ?, ?, ?)`,
                [user.username, user.firstName, user.lastName, user.email, user.password, user.token],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }
                }
            );
        });
    }

}

module.exports = User