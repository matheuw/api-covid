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
    return docs;
}
const find = async function find(query) {
    const docs = await brasil.find(query);
    return docs;
}

const executeDbCommand = async function executeDbCommand() {
    const cursor = await brasil.db.db.command({ listCollections: 1.0, authorizedCollections: true, nameOnly: true });
}

const count = async function count() {
    const docs = await brasil.count();
}


const lastCasosAcumulado = async function lastSemanaEpi(estado){
    const {casosAcumulado} = await brasil.findOne({
        "estado": estado,
        data:{$lte:moment().format()}
    }).sort({
        data: 'desc'
    })
    return casosAcumulado;
}
const lastObitosAcumulado = async function lastObitosAcumulado(estado){
    const {obitosAcumulado} = await brasil.findOne({
        "estado": estado,
        data:{$lte:moment().format()}
    }).sort({
        data: 'desc'
    })
    return obitosAcumulado;
}

 const CreateData =  async function CreateData(dados){

    const {regiao,estado,municipio,data,semanaEpi,populacaoTCU2019,casosAcumulado,casosNovos,obitosAcumulado,obitosNovos} = dados;

    brasil.create({
        regiao: regiao,
        estado: estado,
        municipio: municipio,
        data: data,
        semanaEpi: semanaEpi,
        populacaoTCU2019: populacaoTCU2019,
        casosAcumulado: casosAcumulado,
        casosNovos: casosNovos,
        obitosAcumulado: obitosAcumulado,
        obitosNovos: obitosNovos
    },async function (err, small) {
        if (err) return handleError(err);
        if (regiao === "Brasil"){
        const result = await brasil.findOne({
            "estado": estado,
            data:{$lte:data}
        }).sort({
            data: 'desc'
        })
        brasil.create({
            regiao: regiao,
            estado: "",
            municipio: "",
            data: data,
            semanaEpi: semanaEpi,
            populacaoTCU2019: populacaoTCU2019,
            casosAcumulado: result.casosAcumulado + casosAcumulado,
            casosNovos: result.casosNovos + casosNovos,
            obitosAcumulado: result.obitosAcumulado + obitosAcumulado,
            obitosNovos: result.obitosNovos + obitosNovos
        })
        const resultBrasil = await brasil.findOne({
            "regiao": "Brasil",
            data:{$lte:data}
        }).sort({
            data: 'desc'
        })
        brasil.create({
            regiao: "Brasil",
            estado: "",
            municipio: "",
            data: data,
            semanaEpi: semanaEpi,
            populacaoTCU2019: resultBrasil.populacaoTCU2019,
            casosAcumulado: resultBrasil.casosAcumulado + casosAcumulado,
            casosNovos: resultBrasil.casosNovos + casosNovos,
            obitosAcumulado: resultBrasil.obitosAcumulado + obitosAcumulado,
            obitosNovos: resultBrasil.obitosNovos + obitosNovos
        })
    }
        return small;
    });
    return "Cadastrado com sucesso";
}

const UpdateDate = async function UpdateDate(id,dados){
    const {regiao,estado,municipio,data,semanaEpi,populacaoTCU2019,casosAcumulado,casosNovos,obitosAcumulado,obitosNovos} = dados;
    brasil.where({_id: id}).updateOne({
        regiao: regiao,
        estado: estado,
        municipio: municipio,
        data: data,
        semanaEpi: semanaEpi,
        populacaoTCU2019: populacaoTCU2019,
        casosAcumulado: casosAcumulado,
        casosNovos: casosNovos,
        obitosAcumulado: obitosAcumulado,
        obitosNovos: obitosNovos
    },async function (err, small) {
        if (err) return console.log(err);
        return "Editado com sucesso";
    })


}
const DeleteDate = async function DeleteDate(id){
    brasil.findByIdAndDelete(id,
        async function (err, small) {
            if (err) return console.log(err);
            return "Deletado com sucesso";
        })
}

module.exports = {
    findOne,
    count,
    executeDbCommand,
    find,
    lastCasosAcumulado,
   lastObitosAcumulado,
   CreateData,
   UpdateDate,
   DeleteDate
}