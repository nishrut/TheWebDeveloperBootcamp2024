PORT = 3000

const express = require('express');
const app = express();
// console.dir(app);

// '/' 
// /cats => 'meow'
// /dogs => 'woof'

app.get('/', (req, res) => {
    console.log("HOME PAGE VISITED!!!");
    res.send("WELCOME TO HOME PAGE!!")
})

app.post('/cats', (req, res) => {
    res.send('POST REQUEST TO /cats!!! THIS IS DIFFERENT THAN A GET REQUEST!!')
});
app.get('/cats', (req, res) => {
    console.log("CAT REQUEST!!!");
    res.send("MEOW!!")
})

app.get('/dogs', (req, res) => {
    console.log("DOG REQUEST!!!");
    res.send("WOOF!!")
})




// /r/SOMETHING

// http://localhost:3000/r/cats
app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    // console.log(req.params);
    res.send(`THIS IS A SUBREDDIT with path ${subreddit}`)
    // console.dir(req)
})

// http://localhost:3000/r/cats/catID
app.get('/r/:subreddit/:postID', (req, res) => {
    const { subreddit, postID } = req.params;
    // console.log(req.params);
    res.send(`THIS IS A SUBREDDIT: ${subreddit}<br>THIS IS A postID: ${postID}`)
    // console.dir(req)
})


app.get('/search', (req, res) => {
    const {q, color} = req.query;
    if(!q){
        res.send(`NOTHING FOUND IF NOTHING SEARCH`)
    }
    else{
        res.send(`Hi we received q: ${q} and color: ${color}`)
    }
})



app.get('*', (req, res) => {
    res.send(`I don't know the path: ${req.path}`)
})

app.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}!`);
})
