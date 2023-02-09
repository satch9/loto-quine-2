const express = require('express')
const router = express.Router()
const partyController = require('../controllers/party.controllers')

router.post("/settings", partyController.create)


module.exports = router