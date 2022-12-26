const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json())

const users = [
    {"id": 1, "name": "Mehedi Hasan", "age": 23, "email": "Mehedi@gmail.com"},
    {"id": 2, "name": "Galib Hasan", "age": 24, "email": "Galib@gmail.com"},
    {"id": 3, "name": "Tarique Hasan", "age": 20, "email": "Tarique@gmail.com"},
    {"id": 4, "name": "Johir Hasan", "age": 35, "email": "Johir@gmail.com"},
    {"id": 5, "name": "Kohir Hasan", "age": 37, "email": "kohir@gmail.com"},
    {"id": 6, "name": "Jahid Hasan", "age": 30, "email": "Jahid@gmail.com"},
    {"id": 7, "name": "Fahid Hasan", "age": 40, "email": "Fahid@gmail.com"}
]

app.get('/', (req, res) => {
    res.send('Hello send from server');
});

app.get('/users', (req, res) => {
    const search = req.query.search;
    if(search){
        const searchedUsers = users.filter(user => user.name.toLowerCase().includes(search));
        res.send(searchedUsers);
    }
    else{
        res.send(users);
    }
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users[id-1];
    res.send(user);
});

// post method

app.post('/users', (req, res) => {
    const addeduser = req.body;
    addeduser.id = users.length + 1;
    users.push(addeduser);
    res.send(addeduser);
})

app.listen(port, () => {
    console.log('Listening 4000');
});