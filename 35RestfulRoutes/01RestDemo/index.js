PORT = 3000;

const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');

const methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json
app.use(methodOverride('_method'));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));


let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'SkerBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ id: uuid(), username, comment })
    // res.send("IT WORKED!!")
    // res.render('comments/index', { comments })
    res.redirect('comments')
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', { comment })
})

// 
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id)
    foundComment.comment = newCommentText;
    // res.send("UPDATING SOMETHING!!")
    res.redirect('/comments')

})


app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    // const foundComment = comments.find(c => c.id === id)
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})


app.get('/tacos', (req, res) => {
    res.send("GET /tacos response")
})

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;
    res.send(`OK, here are your ${qty} ${meat} tacos`)
})

app.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`);
});

// GET /comments - list all comments
// POST /comments - create a new comment
// GET /comments/:id - Get one comment ( using ID )
// PATCH /comments/:id - Update one comment
// DELETE /comments:id - Destroy one comment
