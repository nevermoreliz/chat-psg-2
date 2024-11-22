const { default: axios } = require('axios');
const { adapterDB } = require('../../provider/database');
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require('express-validator');

const getPersona = async (req, res) => {

    try {

        const query = 'select * from personas'
        const result = await adapterDB.db.query(query);
        const row = result.rows[0];
        res.send({ row })

    } catch (error) {

        handleHttpError(res, 'ERROR_GET_PERSONA')

    }



};

const getPersonas = () => { };

const createPersona = async (req, res) => {

    try {

        

        const body = matchedData(req);

        const query = `INSERT INTO personas(nombre, paterno, materno, ci, fecha_nacimiento, correo_electronico, sexo, estado, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, true, now(), now()) RETURNING *`;
        
        const values = [body.nombre, body.paterno, body.materno, body.ci, body.fecha_nacimiento, body.correo_electronico, body.sexo];

        const result = await adapterDB.db.query(query, values)
        console.log(result.rows[0]);
        res.send(result.rows[0])
        // res.send(values)

    } catch (error) {

        handleHttpError(res, 'ERROR_CREATE_PERSONA')

    }


};
const updatePersona = () => { };
const deletePersona = () => { };

module.exports = { getPersona, getPersonas, createPersona, updatePersona, deletePersona }