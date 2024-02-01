const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.connect('mongodb://localhost:27017/relationshipDBdemo')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const userSchema = new Schema({
    username: String,
    age: Number
})

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const User = mongoose.model('User', userSchema)
const Tweet = mongoose.model('Tweet', tweetSchema)

// 01
// const makeTweet = async () => {
//     // const user = new User({ username: 'chickenfan99', age: 61 })
//     const user = await User.findOne({ username: 'chickenfan99' })
//     const tweet2 = new Tweet({ text: 'bock bock bock my chickens make noises', likes: 621 })
//     tweet2.user = user
//     // user.save();
//     tweet2.save();
// }

// makeTweet();

// 02
const findTweet = async () => {
    const t = await Tweet.find({}).populate('user')
    console.log(t);
}

findTweet();

