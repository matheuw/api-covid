'use strict';

const mongoose = require('mongoose');
const moment = require('moment');
const collection = 'brasils';

const covidSchema = new mongoose.Schema({
    regiao: String,
    estado: String,
     municipio: String,
     data: Date,
     semanaEpi: Number,
     populacaoTCU2019: Number,
     casosAcumulado: Number,
     casosNovos: Number,
     obitosAcumulado: Number,
     obitosNovos: Number
})

const brasil = mongoose.model(collection, covidSchema);

const findOne = async function findOne() {
    const docs = await brasil.findOne();
    console.log('docs', docs);
    return docs;
}
const find = async function find(query) {
    const docs = await brasil.find(query);
    console.log('docs', docs);
    return docs;
}

const executeDbCommand = async function executeDbCommand() {
    const cursor = await brasil.db.db.command({ listCollections: 1.0, authorizedCollections: true, nameOnly: true });
    console.log('cursor', cursor.cursor.firstBatch);
}

const count = async function count() {
    const docs = await brasil.count();
    console.log('docs', docs);
}

const create = async function create() {
    await brasil.create({ estado: 'RN', regiao: 'Nordeste' });
    await brasil.create({ estado: 'SC', regiao: 'Sul' });
}
const lastCasosAcumulado = async function lastSemanaEpi(estado){
    console.log(moment().format())
    const {casosAcumulado} = await brasil.findOne({
        "estado": estado,
        data:{$lte:moment().format()}
    }).sort({
        data: 'desc'
    })
    return casosAcumulado;
}
const lastObitosAcumulado = async function lastObitosAcumulado(estado){
    console.log(moment().format())
    const {obitosAcumulado} = await brasil.findOne({
        "estado": estado,
        data:{$lte:moment().format()}
    }).sort({
        data: 'desc'
    })
    return obitosAcumulado;
}

module.exports = {
    findOne,
    count,
    create,
    executeDbCommand,
    find,
    lastCasosAcumulado,
   lastObitosAcumulado
}