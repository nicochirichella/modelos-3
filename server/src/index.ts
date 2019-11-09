import Repository from './repository';

var express = require('express');
var app = express();
var cors = require("cors");
const repository = new Repository();
const bodyParser = require("body-parser");

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
    } catch (error) {
      console.log(error);
      res.send({ status: false, error});
    }
  });

  app.get('/get-user', async (req, res) => {
    try {
        const user = await repository.getUser(1);
        res.send({ status: true, user })
    } catch (error) {
        console.log(error);
        res.send({ status: false, error});
    }
  })

  app.post('/users/authenticate', async (req, res) => {
    try {
      const validUser = await repository.authenticate(req.body)
      res.send({status: true, validUser, email:req.body.email})
    } catch (error) {
      console.log(error);
      res.send( {status:false, error})
    }
  })

  app.get('/casos/:user_email', async (req, res) => {
    try {
        const casos = await repository.getAllCasos(req.params.user_email);
        res.send({ status: true, casos })
    } catch (error) {
        console.log(error);
        res.send({ status: false, error});
    }
  })

// On localhost:4000/welcome
app.get('/welcome', function (req, res) {
    res.send('<b>Hello</b> welcome to my http server made with express');
});

// Change the 404 message modifing the middleware
app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// start the server in the port 4000 !
app.listen(4000, function () {
    console.log('Example app listening on port 4000.');
});