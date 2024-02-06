const express = require('express')
const morgan = require("morgan");

const app = express()
const port = 3000


app.listen(port, () => {
    console.log(`--> Servidor arrancado ${port}`)
})

function secondMiddleware(req, res, next) {
  console.log("Passing throught second middleware");
  next();
}

function thirdMiddleware(req, res, next) {
  console.log("Passing throught third middleware");
  next();
}


app.use(express.json())
app.use(secondMiddleware);
app.use(thirdMiddleware);
app.use(morgan("dev"));
app.use(express.static("public"));

// http://localhost:3000/hola
app.get("/hola", (request, response) => {
    console.log('genial, entró en la ruta')
  //console.log(request);
  response.send("Hola Express!");
});

//http://localhost:3000/post/46887746541665478
app.get('/post/:id', (req, res) => {
    console.log('param -> ', req.params)
    // ...... Manejamos comportamiento
    res.send(`Hey! Bienvenida ${req.params.id}`)
})

//http://localhost:3000/post?name=codear&done=ok
app.get('/post', (req, res ) => {
    //name && done && dificultad
    console.log('query params ', req.query)
    res.send(`Esta es la info del post -> ${req.query.name} ${req.query.done} ${req.query.dificultad}`);
})


app.post('/enviar/info', (req, res) => {
    console.log('body -> ', req.body)
    res.send(JSON.stringify(req.body))
})

/**
 * Hay que enviar la info por el body de Postman
 * POSTMAN ->
 * BODY
 * RAW
 * JSON
 * 
 *  {
 *      "name": "Violeta",
 *      "age": 20
 *  }
 */