const {Router} = require('express');
const covidControllers = require('./controllers/CovidControllers');
const routes = Router();



routes.get("/covid/estado", covidControllers.estadoByData);
routes.get("/covid/casos/estado",covidControllers.nowCasosAcumuladobyEstado);
routes.get("/covid/obitos/estado",covidControllers.nowobitosAcumuladoByEstado);
routes.post("/covid",covidControllers.CreateNewData);
routes.put("/covid/update/:id",covidControllers.UpdateDate);
routes.delete("/covid/delete/:id",covidControllers.DeleteDate);
module.exports = routes;