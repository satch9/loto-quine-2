const User = require("../models/users/User")
const bcryptjs = require("bcryptjs")
const { serverClient } = require('../middlewares/streamChat')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./bingo.db")

const create = (req, res) => {
    console.log("req.body createUser", req.body)

    const { username, firstName, lastName, email } = req.body
    let token = null
    let passwordReact = req.body.password
    let salt = bcryptjs.genSaltSync(10);
    let password = bcryptjs.hashSync(passwordReact, salt);

    console.log('password', password)
    User.create({ username, firstName, lastName, email, password, token })
        .then((id) => {
            console.log("id", id)
            let idString = id.toString()

            const token = serverClient.createToken(idString)
            const query = "UPDATE users SET token = ? WHERE id = ?"

            db.run(query, [token, idString], (err) => {
                if (err) {
                    console.log(err)
                }
            })

            res.status(201).json({ id, token, firstName, lastName, username, password })
        })
        .catch((err) => {
            res.status(500).json({ error: err.message })
        })
}

const login = (req, res) => {
    let login_id, login_firstName, login_lastName, login_username, login_password, login_token
    try {
        console.log("req.body login", req.body)
        const { username, password } = req.body

        const query = "SELECT * FROM users  WHERE username = ?"

        db.get(query, [username], async (err, row) => {
            if (err) {
                console.log(err)
            }
            if (row) {
                login_id = row.id
                login_token = row.token
                login_firstName = row.firstName
                login_lastName = row.lastName
                login_username = row.username
                login_password = row.password
            }
            const passwordMatch = await bcryptjs.compare(password, login_password)
            console.log("passwordMatch", passwordMatch)
            if (passwordMatch) {
                res.json({
                    userId: login_id,
                    token: login_token,
                    firstName: login_firstName,
                    lastName: login_lastName,
                    username: login_username,
                    userId: login_id,
                    hashedPassword: login_password
                })
            }
        })


    } catch (error) {
        res.json(error);
    }
}



module.exports = {
    create,
    login
}