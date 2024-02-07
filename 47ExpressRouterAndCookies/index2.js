// learning cookies

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')
app.use(cookieParser('thisismysecret'))


app.get('/greet', (req, res) => {
    const { name = 'no-name' } = req.cookies
    res.send(`HEY THERE!! ${name}`)
})

app.get('/setname', (req, res) => {
    res.cookie('name', 'henrietta')
    res.send('OK SENT YOU A COOKIE!!')
})

app.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'grape', { signed: true })
    res.send('OK SIGNED YOUR FRUIT COOKIE!!')
})

app.get('/verifyfruit', (req, res) => {
    // console.log(req.cookies);
    res.send(req.signedCookies)
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000!!!");
})