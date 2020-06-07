const brasil = require('../models/brasil');

module.exports = {

    async estadoByData(require,response){
        const {estado,datainicial, datafinal} = require.query;
       response.json(await brasil.find({
           
           estado:estado,
           data:{$gte: new Date(datainicial),$lte: new Date(datafinal)}
           
       }));
    },

    async nowCasosAcumuladobyEstado(require,response){

        const {estado} = require.query;
        const casosAcumulado  = await brasil.lastCasosAcumulado(estado);
        response.json({casosAcumulado});
        
    },

    async nowobitosAcumuladoByEstado(require,response){
        const {estado} = require.query;
        const obitosAcumulado = await brasil.lastObitosAcumulado(estado)
        response.json({obitosAcumulado})
    },
    
   async CreateNewData(req,res){
        const dados = req.body
        const resul = brasil.CreateData(dados);
        res.json({resul})
    }

}