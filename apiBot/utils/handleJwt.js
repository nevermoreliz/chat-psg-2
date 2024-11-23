const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
/**
 * Debe pasar el objeto del usuario
 * @param {*} usuario
 */
const tokenSing = async (usuario) => {
    const sing = jwt.sign(
        {
            id: usuario.id_usuario,
            // rol: usuario.rol
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );

    return sing

}

/**
 * Pasar el token de seesion el JWT
 * @param {*} tokenJwt
 */
const verifyToken = async (tokenJwt) => {

    try {
        return jwt.verify(tokenJwt, JWT_SECRET)

    } catch (error) {
        return null
    }
}

module.exports = { tokenSing, verifyToken }