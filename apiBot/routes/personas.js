const express = require('express')
const router = express.Router()
const { getPersona, createPersona } = require('../controllers/personas')
const { validatorCreatePersona } = require('../validators/personas');
const authMiddleware = require('../middleware/session');
const checkRol = require('../middleware/rol');

router.get("/", authMiddleware, checkRol(['superadmin']), getPersona);
router.post("/", authMiddleware, checkRol(['superadmin']), validatorCreatePersona, createPersona);

module.exports = router