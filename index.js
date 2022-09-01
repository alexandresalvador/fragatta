const express = require("express");
const app = express();

// estaremos adotando o servidor do node ao inves do express
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.set('view engine', 'ejs');
app.get('/', (req,res) => {
    res.render('index');
});

io.on('connection', (socket) => {
    console.log('SOCKET INSTANCE', socket.id);
    socket.on('welcome', (data) => {
        console.log('EVENTO DO CLIENTE, CHEGOU NO SERVIDOR', data);
    });
    socket.on('palavra', (dado) => {
        console.log('A PALAVRA CHEGOU NO SERVIDOR', dado);
        socket.emit('resultado', dado);
    });
});



// executando o servidor na porta 5000

http.listen(5000, () => {
    console.log('servidor rodando: http://localhost:5000')
});
