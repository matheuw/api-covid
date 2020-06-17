const brasil = require('../models/brasil');

module.exports = {

    async estadoByData(require,response){
        const {estado,datainicial, datafinal} = require.query;
        response.set('Access-Control-Allow-Origin', '*');
       response.json(await brasil.find({
           
           estado:estado,
           data:{$gte: new Date(datainicial),$lte: new Date(datafinal)}
           
       }));
    },

    async nowCasosAcumuladobyEstado(require,response){
        response.set('Access-Control-Allow-Origin', '*');
        const {estado} = require.query;
        const casosAcumulado  = await brasil.lastCasosAcumulado(estado);
        response.json({casosAcumulado});
        
    },
    async nowCasosAcumuladobyCity(require,response){
        response.set('Access-Control-Allow-Origin', '*');
        const {municipio} = require.query;
        const casosAcumulado  = await brasil.lastCasosAcumuladobyCity(municipio);
        response.json({casosAcumulado});
        
    },

    async nowobitosAcumuladoByEstado(require,response){
        response.set('Access-Control-Allow-Origin', '*');
        const {estado} = require.query;
        const obitosAcumulado = await brasil.lastObitosAcumulado(estado)
        response.json({obitosAcumulado})
    },
    async nowobitosAcumuladoByCity(require,response){
        response.set('Access-Control-Allow-Origin', '*');
        const {municipio} = require.query;
        const obitosAcumulado = await brasil.lastObitosAcumuladobyCity(municipio)
        response.json({obitosAcumulado})
    },
    
   async CreateNewData(req,res){
        res.set('Access-Control-Allow-Origin', '*');
        const dados = req.body
        const resul = brasil.CreateData(dados);
        console.log("Cadastradado")
        res.status(201);
        res.json({resul})
    },

    async UpdateDate(req,res){
        res.set('Access-Control-Allow-Origin', '*');
        const id = req.params.id;
        const dados = req.body;
        const result = brasil.UpdateDate(id,dados);
        res.json({result})
    },

    async DeleteDate(req,res){
        res.set('Access-Control-Allow-Origin', '*');
        console.log("deletando");
        const id = req.params.id;
        const resul = brasil.DeleteDate(id);
        res.json({resul}) 
    }

    
}