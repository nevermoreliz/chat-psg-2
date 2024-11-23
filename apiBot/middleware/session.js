const { adapterDB } = require('../../provider/database')
const { handleHttpError } = require('../utils/handleError')
const { verifyToken } = require('../utils/handleJwt')

const authMiddleware = async (req, res, next) => {
    try {

        if (!req.headers.authorization) {
            handleHttpError(res, 'NEED_SESSION', 401)
            return
        }

        const token = req.headers.authorization.split(' ').pop()
        const dataToken = await verifyToken(token)

        if (!dataToken.id) {
            handleHttpError(res, 'ERROR_ID_TOKEN', 401)
            return
        }

        const query = {
            text: `SELECT id_usuario, nombre_usuario, contrasenia, id_persona, estado FROM usuarios WHERE id_usuario = $1`,
            values: [dataToken.id],
        }
        const resultado = await adapterDB.db.query(query);
        const usuario = resultado.rows[0]

        const query2 = {
            text: `
            select
                ARRAY_AGG(r.nombre_rol) AS roles
            from
                usuario_rol ur
            inner join roles r on
                ur.id_rol = r.id_rol
            where
                ur.id_usuario = $1;`,
            values: [dataToken.id],
        }
        const consultaRoles = await adapterDB.db.query(query2);
        const roles = consultaRoles.rows[0].roles;

        usuarioRoles ={...usuario, roles}
        
        
        req.usuario = usuarioRoles

        next();

    } catch (error) {
        handleHttpError(res, 'NOT_SESSION', 401)
        return
    }
}

module.exports = authMiddleware