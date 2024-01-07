var express = require('express')
var app = express()

app.get('/produtos', function(req, res) {
    res.send('hello word');
}),

app.listen(3001, function() {
    console.log('servidor inicializado na porta 3001');
})