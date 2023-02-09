const Party = require('../models/parties/Party')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./bingo.db")

const create = (req, res) => {
    console.log("req.body partyController", req.body)

    const { name, date_start, date_end, winner, max_cards_by_player, max_players, value_card, steps, prizes, numbers_called, host, status } = req.body

    if (req.body.is_private === true) {
        is_private = 1
    } else {
        is_private = 0
    }

    // transform steps and prizes to string
    let newSteps = steps.map(u => u.gameSteps)
    let newPrizes = prizes.map(u => u.gamePrizes)

    Party.create({ name, date_start, date_end, winner, max_cards_by_player, max_players, value_card, steps: newSteps.join(', '), prizes: newPrizes.join(', '), is_private, numbers_called, host, status })
        .then((party_id) => {
            console.log("id", party_id)

            const query = "INSERT INTO participants (party_id, user_id) VALUES (?, ?)"

            db.run(query, [party_id, parseInt(host)], function (err) {
                if (err) {
                    console.log("err", err)
                } else {
                    console.log("this.lastID", this.lastID)
                }
            })

            res.status(201).json({ id: party_id, name, date_start, date_end, winner, max_cards_by_player, max_players, value_card, steps: newSteps, prizes: newPrizes, is_private, numbers_called, host, status })
        })
        .catch((err) => {
            console.log("err", err)
            res.status(400).json({ err })
        })

}

module.exports = {
    create,
}