const {Router} = require('express');
const covidControllers = require('./controllers/CovidControllers');
const routes = Router();


routes.get("/", function (req, res) {
    res.sendFile(__dirname +"/web-site/index.html")
  })
  routes.get("/cadastro.html", function (req, res) {
    res.sendFile(__dirname +"/web-site/cadastro.html")
  })
routes.get("/covid/estado", covidControllers.estadoByData);
routes.get("/covid/casos/estado",covidControllers.nowCasosAcumuladobyEstado);
routes.get("/covid/obitos/estado",covidControllers.nowobitosAcumuladoByEstado);
routes.get("/covid/casos/municipio",covidControllers.nowCasosAcumuladobyCity);
routes.get("/covid/obitos/municipio",covidControllers.nowobitosAcumuladoByCity);
routes.post("/covid",covidControllers.CreateNewData);
routes.put("/covid/update/:id",covidControllers.UpdateDate);
routes.delete("/covid/delete/:id",covidControllers.DeleteDate);
module.exports = routes;