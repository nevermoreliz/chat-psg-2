const { adapterDB } = require('../../provider/database');
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