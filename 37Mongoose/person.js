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


const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

personSchema.virtual('fullName')
    .get(function () {
        return `${this.first} ${this.last}`
    })
    .set(function (v) {
        const first = v.substring(0, v.indexOf(' '));
        const last = v.substring(v.indexOf(' ') + 1);
        this.set({ first, last });
    })

personSchema.pre('save', async function () {
    // this.first = "YO"
    // this.last = "MAMA"
    console.log("ABOUT TO SAVE!!");
})

personSchema.pre('save', async function () {
    console.log("JUST SAVED!!");
})

const Person = mongoose.model('Person', personSchema);



