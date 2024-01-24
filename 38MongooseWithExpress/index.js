PORT = 3000;


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        // console.log(`category: ${category}`);
        res.render('products/index', { products, category })
    }
    else {
        const products = await Product.find({})
        res.render('products/index', { products, category: "All" })
    }
    // console.log(products);
    // res.send("ALL PRODUCTS WILL BE HERE!!")
    // res.render('products/index', { products })
})

app.get('/products/new', (req, res) => {
    res.render('products/new')
})

app.post('/products', async (req, res) => {
    // console.log(req.body);
    const newProduct = new Product(req.body)
    await newProduct.save()
    console.log(newProduct);
    // res.send('making your product')
    res.redirect(`/product/${newProduct._id}`)
})

app.get('/product/:id', async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    // console.log(product);
    // res.send("details page!!")
    res.render('products/show', { product })
})

app.get('/product/:id/edit', async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    res.render('products/edit', { product })
})

app.put('/product/:id', async (req, res) => {
    const { id } = req.params
    // console.log(req.body);
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    // res.send("PUT!!!")
    res.redirect(`/product/${product._id}`)
})


app.delete('/product/:id', async (req, res) => {
    // res.send("DELETE!!!")
    const { id } = req.params
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products')
})



app.listen(PORT, () => {
    console.log(`APP IS LISTENING ON PORT ${PORT}!`);
})