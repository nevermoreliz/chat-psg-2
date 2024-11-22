const { default: axios } = require('axios');
const { adapterDB } = require('../../provider/database');
const { encrypt } = require('../utils/handlePassword');
const { matchedData } = require('express-validator');
const { handleHttpError } = require('../utils/handleError');

const getUser = async (req, res) => {
    try {
        const query = 'select * from usuarios'
        const result = await adapterDB.db.query(query);
        const row = result.rows[0];
        res.send({ row })
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_USUARIO_DETALLE')
    }
};

const getUsers = async (req, res) => {
    try {

    } catch (error) {
        handleHttpError(res, 'ERROR_GET_USUARIOS')
    }
};

const createUsuario = async (req, res) => {
    try {
        req = matchedData(req)

        const contrasenia = await encrypt(req.contrasenia)
        const body = { ...req, contrasenia }

        const query = `INSERT INTO usuarios(nombre_usuario, contrasenia, id_persona, estado, created_at, updated_at) VALUES($1, $2, $3, true, now(), now()) RETURNING *`;

        const values = [body.nombre_usuario, body.contrasenia, body.id_persona];

        const result = await adapterDB.db.query(query, values)

        const usuario = result.rows[0];
        usuario.contrasenia = undefined;

        console.log(usuario);
        res.send(usuario)

    } catch (error) {
        handleHttpError(res, 'ERROR_CREATE_USUARIO')
    }
};
const updateUser = async (req, res) => {
    try {

    } catch (error) {
        handleHttpError(res, 'ERROR_UPDATE_USUARIO')
    }
};
const deleteUser = async (req, res) => {
    try {

    } catch (error) {
        handleHttpError(res, 'ERROR_DELETE_USUARIO')
    }
};

module.exports = { getUser, getUsers, createUsuario, updateUser, deleteUser }