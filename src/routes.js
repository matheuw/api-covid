const {Router} = require('express');
const covidControllers = require('./controllers/CovidControllers');
const routes = Router();



routes.get("/covid/estado", covidControllers.estadoByData);
routes.get("/covid/cidade", covidControllers.cidadeByData);
routes.get("/covid/casos/estado",covidControllers.nowCasosAcumuladobyEstado);
routes.get("/covid/obitos/estado",covidControllers.nowobitosAcumuladoByEstado);
routes.post("/covid",covidControllers.CreateNewData);
routes.get("/covid/raio",covidControllers.getRaio);
module.exports = routes;