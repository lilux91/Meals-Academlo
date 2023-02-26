require('dotenv').config();

//1. importamos el modelo
const Server = require('./models/server');

//2. Instaciamos el servidor de la clase
const server = new Server();

//3. pongo a escuchar mi servidor

server.listen();
