const { name } = require('ejs');
const Product = require('./product');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Farm must have a name']
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Email required"]
    },

    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        }
    ]

})

farmSchema.pre('findOneAndDelete', async (data) => {
    console.log("PRE MIDDLEWARE!!");
    console.log(data);
})

farmSchema.post('findOneAndDelete', async (farm) => {
    // console.log("POST MIDDLEWARE!!");
    if (farm.products.length) {
        const res = await Product.deleteMany({ _id: { $in: farm.products } })
        console.log(res);
    }
})



const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;