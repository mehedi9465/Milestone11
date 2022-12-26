const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u8ama.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("Volunteer");
      const eventCollection = database.collection("Events");
      const registeredCollection = database.collection("Registered");

      console.log('Connected');
        // Get all Events
        app.get('/events', async (req, res) => {
            const events = await eventCollection.find({}).toArray();
            res.send(events);
        });

        // Get Event by Name
        app.get('/events/:eventName', async (req, res) => {
          const eventName = req.params.eventName;
          const query = {name: eventName}
          const result = await eventCollection.findOne(query);
          res.send(result);
        });

        // Register into a Event
        app.post('/registered', async (req, res) => {
          const event = req.body;
          console.log(event);
          const result = await registeredCollection.insertOne(event);
          res.json(result);
      });
      
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Server is Running');
});

app.listen(port, () => console.log('Listening to', port))