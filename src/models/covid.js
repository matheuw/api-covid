const mongoose = require('mongoose');

//     try {
    
//       mongoose.connect('mongodb+srv://covid:covid19@cluster0-jcd2p.mongodb.net/covid?retryWrites=true&w=majority',
//    {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//    },
//     (error)=>{
//         console.log("connect callback erro:",error);
//     }
//    )
//    } catch (error) {
//        console.log("Try catch",error);
//    }

//    process.on('connected', async () => {
//     console.log('connected')
// })


const covidSchema =  new mongoose.Schema({

    regiao:String,
    estado:String,
    municipio:String
    // data:Date,
    // semanaEpi:Number,
    // populacaoTCU2019:Number,
    // casosAcumulado:Number,
    // casosNovos:Number,
    // obitosAcumulado:Number,
    // obitosNovos:Number
})


var MyModel =  mongoose.model('brasil',covidSchema);
MyModel.findOne(function(error, result) { 
  if (error) { console.log('findOne',error) }
  console.log('findOneResult', result);
})

module.exports = mongoose.model('brasil', covidSchema);