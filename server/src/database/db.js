const sqlite3 = require('sqlite3').verbose()

// create a fuinction connect to database
const connect = () => {
    // open the database
    let db = new sqlite3.Database('./bingo.db', (err) => {
        if (err) {
            console.error("database error : ", err.message)
        }
        console.log('Connected to the database.')
    })

    initialize(db)
    return db
}

// fetch all tables from the database
const initialize = (dbInstance) => {
    // initialize the database with the database/init/bingo.sql file
    dbInstance.serialize(() => {
        dbInstance.run(
            `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            token TEXT NULL
          )`
        )

        dbInstance.run(`CREATE TABLE IF NOT EXISTS cartons (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            nums TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id)
          )`
        )

        dbInstance.run(`CREATE TABLE IF NOT EXISTS parties (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            winner INTEGER NOT NULL,
            name TEXT NOT NULL,
            date_start TEXT NOT NULL,
            date_end TEXT NOT NULL,
            max_cards_by_player INTEGER NOT NULL,
            max_players INTEGER NOT NULL,
            value_card INTEGER NOT NULL,
            steps TEXT NOT NULL,
            prizes TEXT NOT NULL,
            is_private INTEGER NOT NULL,
            status TEXT NOT NULL,
            numbers_called TEXT NOT NULL,
            host TEXT NOT NULL,
            FOREIGN KEY (winner) REFERENCES users (id)
          )`
        )

        dbInstance.run(`CREATE TABLE IF NOT EXISTS participants (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            party_id INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id),
            FOREIGN KEY (party_id) REFERENCES parties (id)
          )`
        )
    })
}

// create a function to close the database
const close = (db) => {
    db.close((err) => {
        if (err) {
            console.error(err.message)
        }
        console.log('Close the database connection.')
    })
}

module.exports = {
    connect,
    initialize,
    close,
}

