const brasil = require('../models/brasil');

module.exports = {

    async estadoByData(require,response){
        const {estado,datainicial, datafinal} = require.query;
       response.json(await brasil.find({
           
           estado:estado,
           data:{$gte: new Date(datainicial),$lte: new Date(datafinal)}
           
       }));
    },
    async cidadeByData(require,response){
        const {cidade,datainicial, datafinal} = require.query;
        
       response.json(await brasil.find({
           
           municipio:cidade,
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
    },
    async getRaio(require,response){
        const {lat,lon,radius} = require.query;
        
        const coords = [
            parseFloat(lat),parseFloat(lon)
        ]
        var result = await brasil.findMunicipio({
                coordenadas:{
                    $geoWithin:{
                        $centerSphere:
                        [coords,parseFloat(radius)/3963.2]
                        }
                    }
                }
            )
        const municipio = []
        const dadosMunicipio = []
        const codUF = []
        result.forEach( element => {
            municipio.push(element.nome)
            dadosMunicipio.push({cidade:element.nome,latlng:element.coordenadas})
            codUF.push(element.codigo_uf)
        })
        result =  await brasil.find({
            municipio:{$in:municipio}
        })
        const raio = []
        var arrayAtual = [];
        var atual;
        result.forEach( element => {
            var casosAcumulado = element.casosAcumulado
            var populacao = element.populacaoTCU2019
            if(!arrayAtual.includes(element.municipio)){
                atual = element.municipio
                var latlng = dadosMunicipio.find(element => {
                    if(atual == element.cidade){
                        return true;
                    }else{
                        return false;
                    }
                })
                arrayAtual.push(element.municipio)
                
                // console.log(latlng)
                
                raio.push({cidade:element.municipio,lat:latlng.latlng[0],lng:latlng.latlng[1],casosAcumulado,populacao})
            }
           
        })
        response.json(raio);
        
    }

}