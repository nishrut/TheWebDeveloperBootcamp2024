PORT = 3000;

const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');

const methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

let tweetDB = [
    {
        username: 'user1',
        tweets: [
            {
                text: 'Learning JavaScript today. Working on a simple web app. #JavaScript',
                comments: [
                    'JavaScript is a great language to learn!',
                    'What kind of web app are you building?',
                    'Need any help or advice?',
                    'Exciting times ahead! Good luck with your project.',
                    'Looking forward to seeing your web app!'
                ]
            },
            { text: 'This is my first tweet!', comments: ['Nice tweet!', 'Keep it up!'] },
            { text: 'Just had a great day!', comments: ['Glad to hear that!', 'Tell us more!'] }
        ]
    },
    {
        username: 'user2',
        tweets: [
            { text: 'Coding is fun!', comments: ['Totally agree!', 'What are you working on?'] },
            { text: 'Learning JavaScript today.', comments: ['Awesome!', 'Any specific goals?'] },
            {
                text: 'This is my first tweet! Excited to join the Twitter community. #FirstTweet',
                comments: [
                    'Welcome to Twitter! 🎉',
                    'Congratulations on your first tweet!',
                    'Looking forward to more tweets from you!',
                    'Great start! Keep it up!',
                    'If you have any questions, feel free to ask.']
            }
        ]
    },
    {
        username: 'user3',
        tweets: [
            { text: 'Cooking experiment: new recipe!', comments: ['Looks delicious!', 'Share the recipe!'] },
            { text: 'Watching my favorite TV show.', comments: ['I love that show too!', 'What episode?'] }
        ]
    },
    {
        username: 'user4',
        tweets: [
            { text: 'Hiking in the mountains!', comments: ['Nature is amazing!', 'Stay safe!'] },
            {
                text: 'Coding is fun! Today, I learned about asynchronous programming in JavaScript. #CodingJourney',
                comments: [
                    'That\'s a key concept! Well done.',
                    'Asynchronous programming can be challenging but rewarding.',
                    'What project are you working on?',
                    'Any tips for someone learning asynchronous programming?',
                    'Keep coding and learning!'
                ]
            },
            { text: 'Reading a good book.', comments: ['What book?', 'Recommendations?'] }
        ]
    },
    {
        username: 'user5',
        tweets: [
            { text: 'Traveling to new places.', comments: ['Enjoy your trip!', 'Take lots of pictures!'] },
            { text: 'Working on a side project.', comments: ['Exciting!', 'Tell us more about it.'] },
            {
                text: 'Just had a great day exploring the city. Found some hidden gems. #Adventure',
                comments: [
                    'Sounds like an amazing day!',
                    'Discovering hidden gems is always fun.',
                    'What was your favorite part of the day?',
                    'Any recommendations for places to visit?',
                    'Keep sharing your adventures!'
                ]
            }
        ]
    }
]

app.get('/tweets', (req, res) => {
    res.render('tweets/index', { tweetDB })
})


app.listen(PORT, () => {
    console.log(`LISTENING TO PORT ${PORT}`);
})