const express = require('express')
const router = express.Router()
const userController = require('../controllers/users.controllers')

router.post("/register", userController.create)
router.post("/login", userController.login)

module.exports = router