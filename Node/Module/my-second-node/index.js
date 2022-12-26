const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const app = express();

app.use(cors());
// app.use(bodyParser());
// or
app.use(express.json());

const port = process.env.PORT || 3000;

const users = 
    [
        {
            "id": "1",
            "name": "Mehedi Hasan",
            "email": "Mehedi@gmail.com"
        },
        {
            "id": "2",
            "name": "Choyon",
            "email": "Choyon@gmail.com"
        },

        {
            "id": "3",
            "name": "Tarique",
            "email": "Tarique@gmail.com"
        },
        {
            "id": "4",
            "name": "Rony",
            "email": "Rony@gmail.com"
        }  
    ]


app.get('/', (req, res) => {
    res.send('Response From My Second Node Server....');
});

app.get('/users', (req, res) => {
    const search = req.query.search;
    if(search){
        const searchItems = users.filter(user => user.Name.toLowerCase().includes(search));
        res.send(searchItems);
    }
    else{
        res.send(users);
    }
}); 

// post
app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length;
    users.push(newUser);
    console.log('Hitting the post', req.body);
    res.json(newUser);
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id - 1;
    const user = users[id];
    res.send(user)
})

app.listen(port, () => {
    console.log('Listening to Port', port);
})