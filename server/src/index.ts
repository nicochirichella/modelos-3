import Repository from './repository';

var express = require('express');
var app = express();
var cors = require("cors");
const repository = new Repository();
const bodyParser = require("body-parser");

function ordenarCasos(casos) {
  let casosOrdenados = []
  let datosIniciales = procesamientoInicial(casos)
  let totales = datosIniciales[0]
  let casosFijos = datosIniciales[1]

  let minimoYPosicion
  let valor
  casos.forEach(caso => {

    if (casosFijos.indexOf(caso) === -1) {

      if (casosOrdenados.length < (10 - casosFijos.length)){
        valor = valorCaso(caso, totales)
        casosOrdenados.push([caso, valor])
        minimoYPosicion = getMinimoYPosicion(casosOrdenados)
      } else {
        valor = valorCaso(caso, totales)
        if (valor > minimoYPosicion[0]) {
          casosOrdenados[minimoYPosicion[1]] = [caso, valor]
          minimoYPosicion = getMinimoYPosicion(casosOrdenados)
        }
      }
    }
  });

  let casosATrabajar  = casosOrdenados.map(function(caso) {
    return caso[0];
  });

  casosATrabajar = casosFijos.concat(casosATrabajar)

  return casosATrabajar
}

function getMinimoYPosicion(casosYValores){
  let minimo = casosYValores[0][1];
  let posicion = 0;
  casosYValores.forEach(element => {
    if (element[1] < minimo) {
      minimo = element[1]
      posicion = casosYValores.indexOf(element)
    }
  });

  return [minimo,posicion]
}

function procesamientoInicial(casos) {
  let totales = {
    valoracion: 0,
    ultimo_movimiento: 0,
    ganancia: 0
  }
  let casosConVenimientoProximo = []
  let diaEnMilisegundos = 1000 * 60 * 60 * 24
  let vencimientoTolerable = 7

  casos.forEach(caso => {
    totales.valoracion += caso.valoracion
    totales.ultimo_movimiento += ((Date.now() - caso.ultimo_movimiento) / diaEnMilisegundos)
    totales.ganancia += caso.ganancia

    if (caso.vencimiento !== null && (caso.vencimiento - Date.now()) / diaEnMilisegundos < vencimientoTolerable) {
      casosConVenimientoProximo.push(caso)
    }
  });
  return [totales, casosConVenimientoProximo]
}

function valorCaso(caso, totales) {
  let diaEnMilisegundos = 1000 * 60 * 60 * 24
  let ponderacion = {
    valoracion: 0.13,
    ultimo_movimiento: 0.59,
    ganancia: 0.28
  }

  let diasDesdeUltimoMovimiento = ((Date.now() - caso.ultimo_movimiento) / diaEnMilisegundos)
  return (caso.ganancia / totales.ganancia) * ponderacion.ganancia
    + (caso.valoracion / totales.valoracion) * ponderacion.valoracion
    + (diasDesdeUltimoMovimiento / totales.ultimo_movimiento) * ponderacion.ultimo_movimiento
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
// on the request to root (localhost:4000/)
app.get('/', function (req, res) {
  res.send('<b>My</b> first express http server');
});

app.post('/create-user', async (req, res) => {
  try {
    console.log(req);
    await repository.createUserIfNotExists(req.body);
    const userInformation = await repository.getUserInformation(req.body.id);
    res.send({ status: true, userInformation });
  } catch (error) {
    console.log(error);
    res.send({ status: false, error });
  }
});

app.get('/get-user', async (req, res) => {
  try {
    const user = await repository.getUser(1);
    res.send({ status: true, user })
  } catch (error) {
    console.log(error);
    res.send({ status: false, error });
  }
})

app.post('/users/authenticate', async (req, res) => {
  try {
    const validUser = await repository.authenticate(req.body)
    res.send({ status: true, validUser, email: req.body.email })
  } catch (error) {
    console.log(error);
    res.send({ status: false, error })
  }
})

app.get('/casos/:user_email', async (req, res) => {
  try {
    const casos = await repository.getAllCasos(req.params.user_email);
    res.send({ status: true, casos })
  } catch (error) {
    console.log(error);
    res.send({ status: false, error });
  }
})

app.get('/ordenar-casos/:user_email', async (req, res) => {
  try {
    let casos = await repository.getCasosToOrder(req.params.user_email);
    let casosOrdenados = ordenarCasos(casos);
    res.send({ status: true, casos: casosOrdenados })
  } catch (error) {
    console.log(error);
    res.send({ status: false, error });
  }
})

// On localhost:4000/welcome
app.get('/welcome', function (req, res) {
  res.send('<b>Hello</b> welcome to my http server made with express');
});

// Change the 404 message modifing the middleware
app.use(function (req, res, next) {
  res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// start the server in the port 4000 !
app.listen(4000, function () {
  console.log('Example app listening on port 4000.');
});