PORT = 3000

const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');
// console.log(redditData);

app.use(express.static(path.join(__dirname, 'public')))
// public
//  /css 
//  /js
//  /imgs


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('home.ejs');
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    // res.render('random', { rand: num })
    res.render('random', { num })
})

app.get('/cats', (req, res) => {
    const cats = [
        'Blue', 'Green', 'Rocket', 'Wilson', 'Monty'
    ]
    res.render('cats', { cats })
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params
    const data = redditData[subreddit];
    // console.log(data);
    if (data){
        res.render('subreddit', { ...data })
    }
    else{
        res.render('notfound', {subreddit})
    }
})

app.listen(PORT, () => {
    console.log(`LISTENING ON PORT: ${PORT}`);
}) 