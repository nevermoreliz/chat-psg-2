const bcryptjs = require('bcryptjs')

/**
 * contraseña sin encriptar
 * @param {*} contraseniaPlano 
 */
const encrypt = async (contraseniaPlano) => {
    const hash = await bcryptjs.hash(contraseniaPlano, 10)
    return hash
}

/**
 * Pasar contrasenia sin encriptar y pásar contraseña encriptada
 * @param {*} contraseniaPlano 
 * @param {*} hashContrasenia 
 */
const compare = async (contraseniaPlano, hashContrasenia) => {
    return await bcryptjs.compare(contraseniaPlano, hashContrasenia)
}

module.exports = { encrypt, compare }