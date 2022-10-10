const express = require('express')
const exphbs = require('express-handlebars')
const axios = require("axios").default;
const fs = require('fs')
const {getProductos, getProductoById, saveProducto, modifyProductoById, deleteProductoById, deleteAllProducts,  } = require('./contenedores/contenedor');

const app = express()

const productos = []

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', async (req, res) => {
    const productos = await getProductos().catch();
    res.render('formulario', {productos});
});

app.get('/productos', async (req, res) => {
    const productos = await getProductos().catch();
    res.render('historial', {productos});
});

app.post('/productos', async (req, res) => {
    // productos.push(req.body)
    const producto = req.body
    const productoNuevo = await saveProducto(producto).catch()
    const productos = await getProductos().catch();
    console.log(productos)
    res.render('historial', {productos});
});


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
