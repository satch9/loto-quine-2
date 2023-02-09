const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./bingo.db")

class Party {

    constructor(id, name, date_start, date_end, winner, max_cards_by_player, max_players, value_card, steps, prizes, is_private, numbers_called, host) {
        this.id = id
        this.name = name
        this.date_start = date_start
        this.date_end = date_end
        this.winner = winner
        this.max_cards_by_player = max_cards_by_player
        this.max_players = max_players
        this.value_card = value_card
        this.steps = steps
        this.prizes = prizes
        this.is_private = is_private
        this.numbers_called = numbers_called
        this.host = host
    }

    // method to create a new party to the database
    static create(party) {
        console.log("party Model", party)
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO parties (name,date_start, date_end, winner, max_cards_by_player, max_players, value_card, steps, prizes, is_private, numbers_called, host, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [party.name, party.date_start, party.date_end, party.winner, party.max_cards_by_player, party.max_players, party.value_card, party.steps, party.prizes, party.is_private, party.numbers_called, party.host, party.status],
                function (err) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(this.lastID)
                    }
                }
            )
        })
    }
}

module.exports = Party