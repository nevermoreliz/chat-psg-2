const express = require('express')
const router = express.Router()

const { validatorRegistro } = require('../validators/auth');
const { createUsuario } = require('../controllers/users');

router.post("/register", validatorRegistro, createUsuario);

module.exports = router