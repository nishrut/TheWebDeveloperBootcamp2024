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

let todos = [
    { id: uuid(), task: 'Buy groceries', completed: false },
    { id: uuid(), task: 'Finish coding project', completed: true },
    { id: uuid(), task: 'Read a book', completed: false },
    { id: uuid(), task: 'Exercise for 30 minutes', completed: false },
    { id: uuid(), task: 'Call a friend', completed: true },
    { id: uuid(), task: 'Plan weekend activities', completed: false },
    { id: uuid(), task: 'Learn a new skill', completed: false },
    { id: uuid(), task: 'Organize closet', completed: true },
    { id: uuid(), task: 'Watch a movie', completed: false },
    { id: uuid(), task: 'Write in journal', completed: true }
]

app.get('/todos', (req, res) => {
    completedTodos = todos.filter(todos => todos.completed === true);
    incompletedTodos = todos.filter(todos => todos.completed === false);
    res.render('todos/index', { completedTodos, incompletedTodos })
})

app.get('/todos/new', (req, res) => {
    res.render('todos/new')
})

app.post('/todos', (req, res) => {
    // console.log(req.body);
    const { task } = req.body;
    todos.push({ id: uuid(), task, completed: false });
    res.redirect('todos')
})


app.get('/todos/:id/edit', (req, res) => {
    const { id } = req.params;
    const todo = todos.find(todo => todo.id === id);
    res.render('todos/edit', { todo })

})

app.patch('/todos/:id', (req, res) => {
    const { id } = req.params
    const currentTodo = todos.find(todo => todo.id === id);
    const updatedTask = req.body.task;
    currentTodo.task = updatedTask
    res.redirect('/todos')
})

app.patch('/todos/:id/markCompleted', (req, res) => {
    const { id } = req.params
    const currentTodo = todos.find(todo => todo.id === id);
    currentTodo.completed = true
    res.redirect('/todos')
})


app.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`);
});
