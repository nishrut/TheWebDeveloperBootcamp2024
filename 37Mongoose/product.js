const MONGOLINK = "mongodb://localhost:27017/shopApp"

const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/test');
mongoose.connect(MONGOLINK)
    .then(() => {
        console.log("CONNECTION OPEN!!");
    })
    .catch((err) => {
        console.log("OH NO ERROR!!!");
        console.log(err);
    });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20,
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive yo dodo!']
    },
    onSale: {
        type: Boolean,
        default: false,
    },
    categories: [String],
    qty: {
        onLine: {
            type: Number,
            default: 0,
        },
        inStore: {
            type: Number,
            default: 0,
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
});

// 04
productSchema.methods.greet = function () {
    console.log("HELLO!! HI!!! HOWDY!!!");
    console.log(`- from ${this.name}`);
}

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.methods.addCategory = function (newCategory) {
    if (!this.categories.includes(newCategory))
        this.categories.push(newCategory)
    else
        console.log(`${newCategory} already exists!!`);
    return this.save();
}

productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0 })
}


const Product = mongoose.model('Product', productSchema);


// 01
// const bike = new Product({ name: 'Tire Pump', price: 25, categories: ['Cycling'] });
// bike.save()
//     .then((data) => {
//         console.log("IT WORKED!!!");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("OH NO ERROR!!");
//         console.log(err);
//     })


// 02
// Product.findOneAndUpdate({ name: 'Tire Pump' }, { price: -10 }, { new: true, runValidators: true })
//     .then((data) => {
//         console.log("IT WORKED!!!");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("OH NO ERROR!!");
//         console.log(err);
//     });


// 03
// const bike = new Product({ name: 'Cycling Jersey', price: 28.50, categories: ['Cycling'], size: 'S' });
// bike.save()
//     .then((data) => {
//         console.log("IT WORKED!!!");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("OH NO ERROR!!");
//         console.log(err);
//     })


// 04
// const findProduct = async () => {
//     const foundProduct = await Product.findOne({ name: 'Bike Helmet' });
//     foundProduct.greet();
//     // return foundProduct;
//     // console.log(foundProduct);
//     await foundProduct.toggleOnSale();
//     console.log(foundProduct);
//     await foundProduct.addCategory('Wearing')
//     console.log(foundProduct);
// }

// findProduct()


// 05
Product.fireSale()
    .then(res => {
        console.log(res);
    })


// 04    
// findProduct()
//     .then((p) => {
//         console.log(p);
//         p.greet();
//     })
//     .catch((err) => {
//         console.log("ERROR!!!");
//         console.log(err);
//     })

// Product.findOne({ name: 'Mountain Bike' })
//     .then((p) => {
//         p.greet();
//     })
//     .catch((err) => {
//         console.log("ERROR!!!");
//         console.log(err);
//     })




