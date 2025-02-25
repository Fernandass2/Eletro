const { app, BrowserWindow } = require('electron');
const express = require('express');
const path = require('path');

const server = express();
server.use(express.static(path.join(__dirname, 'views')));

server.get('/cadastro', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'cadastro.html'));
});
server.get('/os', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'os.html'));
});
server.get('/manutencao', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'manutencao.html'));
});
server.get('/eletrodomestico', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'eletrodomestico.html'));
});

server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

app.whenReady().then(() => {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadURL('http://localhost:3000'); // Carrega o servidor Express dentro do Electron
});

