const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/relationshipDBdemo')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    address: [
        {
            // _id: {_id: false},
            street: String,
            city: String,
            state: String,
            country: {
                type: String,
                required: true
            },

        }
    ]
})


const User = mongoose.model('User', userSchema)

const makeUser = async () => {
    const u = new User({
        first: "Harry",
        last: "Potter",
    })
    u.address.push({
        street: "123 Sesame st.",
        city: "New York",
        state: "NY",
        country: "USA"
    })
    const res = await u.save()

    console.log(res);
}


const addAddress = async (id) => {
    const user = await User.findById(id);
    user.address.push({
        street: "99 3rd st.",
        city: "New York",
        state: "NY",
        country: "USA"
    })
    const res = await user.save()
    console.log(res);
}

addAddress('65b983e1c98b26c632b8af18')

// makeUser()