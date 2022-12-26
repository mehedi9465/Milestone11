const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('I am from crud mongoDB Crud Server');
});

// username: Mehedi
// password: 25MXm5E6VyO6yCKw

const uri = "mongodb+srv://Mehedi:25MXm5E6VyO6yCKw@cluster0.u8ama.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Add User to DataBase
async function run() {
    try {
      await client.connect();
      const database = client.db("Peoples");
      const userCollection = database.collection("Users");
      
      // Get Users
      app.get('/users', async(req, res) => {
        const cursor = userCollection.find({});
        const users = await cursor.toArray();
        res.send(users);
      });
      
      // Get Single User
      app.get('/users/:id', async(req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) }
        const user = await userCollection.findOne(query);
        res.send(user);
      })

      // post request
        app.post('/users', async(req, res) => {
            const user = req.body;
            const result = userCollection.insertOne(user);
            res.send(user);
        });

      // Update Single User
      app.put('/users/:id', async(req, res) => {
        const id = req.params.id;
        const user = req.body;
        const query = { _id: ObjectId(id) };
        const options = { upsert: true };
        const updatedUser = {
            $set:{
              name: user.name,
              email: user.email
            }
        }
        console.log(updatedUser);
        const result = await userCollection.updateOne(query, updatedUser, options)
        res.send(result);
      })

      // Delete API
      app.delete('/users/:id', async(req, res) => {
        const id = req.params.id;
        const query = {_id: ObjectId(id)}
        const result = await userCollection.deleteOne(query);
        res.send(result);
      })

      
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.listen(port, () => {
    console.log('listening', port);
})