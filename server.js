const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
var ListaPalavras = require('./lista');


app.use('/static', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});


app.get('/getpalavra', function (req, res) {
    res.send(ListaPalavras[Math.floor(Math.random() * ListaPalavras.length)].toUpperCase());
});


app.listen(PORT);