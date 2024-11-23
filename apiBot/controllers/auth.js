const { adapterDB } = require('../../provider/database');
const { encrypt, compare } = require('../utils/handlePassword');
const { matchedData } = require('express-validator');
const { handleHttpError } = require('../utils/handleError');
const { tokenSing } = require('../utils/handleJwt');


/**
 * este controlador es encargado de registrar
 * @param {*} req 
 * @param {*} res 
 */
const registroCtrl = async (req, res) => {
    try {
        req = matchedData(req)

        const contrasenia = await encrypt(req.contrasenia)
        const body = { ...req, contrasenia }

        const query = `INSERT INTO usuarios(nombre_usuario, contrasenia, id_persona, estado, created_at, updated_at) VALUES($1, $2, $3, true, now(), now()) RETURNING *`;

        const values = [body.nombre_usuario, body.contrasenia, body.id_persona];

        const result = await adapterDB.db.query(query, values)

        const usuario = result.rows[0];
        usuario.contrasenia = undefined;

        const data = {
            token: await tokenSing(usuario),
            user: usuario
        }

        console.log(data);
        res.send(data)

    } catch (error) {
        handleHttpError(res, 'ERROR_REGISTER_USUARIO')
    }
};

/**
 * es el encargado de logear a una persona
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req, res) => {

    try {
        req = matchedData(req)

        const query = {
            text: `SELECT id_usuario, nombre_usuario, contrasenia, id_persona, estado FROM usuarios WHERE nombre_usuario = $1`,
            values: [req.nombre_usuario],
        }

       

        const resultado = await adapterDB.db.query(query);
        const usuario = resultado.rows[0];
        
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
            values: [usuario.id_usuario],
        }
        const consultaRoles = await adapterDB.db.query(query2);
        const roles = consultaRoles.rows[0].roles;
        

        if (!usuario) {
            handleHttpError(res, 'USER_NOT_EXISTS', 404);
            return
        }

        const hashPassword = usuario.contrasenia;

        const check = await compare(req.contrasenia, hashPassword)

        if (!check) {
            handleHttpError(res, 'PASSWORD_INVALID', 402)
            return
        }

        usuario.contrasenia = undefined;

        usuarioRoles ={...usuario, roles}

        const data = {
            token: await tokenSing(usuarioRoles),
            user: usuarioRoles
        }

        res.send({ data })

    } catch (error) {
        console.log(error);

        handleHttpError(res, 'ERROR_LOGIN_USUARIO')
    }
}

module.exports = { registroCtrl, loginCtrl }