const port = 3003;
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const db = require('./database.js');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/products', (req, res, next) => {
    res.send(db.getAllProducts());
});

app.get('/product/:id', (req, res, next) => {
    res.send(db.getProduct(req.params.id));
});

app.post('/product/', (req, res, next) => {
    const product = db.saveProduct({
        name: req.body.name,
        price: req.body.price
    });
    res.send(product);
});

app.put('/product/:id', (req, res, next) => {
    const product = db.saveProduct({
        id: Number(req.params.id),
        name: req.body.name,
        price: req.body.price
    });
    res.send(product);
});

app.delete('/product/:id', (req, res, next) => {
    res.send(db.deleteProduct(req.params.id));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});