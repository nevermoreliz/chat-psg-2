const express = require('express')
const router = express.Router()
const { getPersona, createPersona } = require('../controllers/personas')
const { validatorCreatePersona } = require('../validators/personas')

router.get("/", getPersona);
router.post("/", validatorCreatePersona, createPersona);

module.exports = router