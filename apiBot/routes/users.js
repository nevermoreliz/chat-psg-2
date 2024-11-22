const express = require('express')
const router = express.Router()
const { getUser, createUser } = require('../controllers/users')

//TODO http://localhost/tracks :: get,post,delete.put

// router.get("/", getUser);
// router.post("/:id", createUser);

module.exports = router