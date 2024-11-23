const express = require('express')
const router = express.Router()

const { validatorRegistro, validatorLogin } = require('../validators/auth');
const { loginCtrl, registroCtrl } = require('../controllers/auth');

router.post("/registro", validatorRegistro, registroCtrl);
router.post("/login", validatorLogin, loginCtrl);


module.exports = router