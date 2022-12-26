const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const objectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// username: Mehedi
// password: 25MXm5E6VyO6yCKw

const uri = "mongodb+srv://Mehedi:25MXm5E6VyO6yCKw@cluster0.u8ama.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
    try {
      await client.connect();
      const database = client.db('Shop');
      const productCollection = database.collection('Products');
      
      // Insert a Product
      app.post('/products', async(req, res) => {
        console.log(`Product is ${req.body}`);
        const product = req.body;
        const result = await productCollection.insertOne(product);
        res.send(result);
      })

      // Get Products
      app.get('/products', async(req, res) => {
        const result = productCollection.find({});
        const products = await result.toArray();
        console.log(products);
        res.send(products);
      })

      // Get Single product
      app.get('/products/:id', async(req, res) => {
        const id = req.params.id;
        console.log(id);
        const query = { _id: objectId(id) }
        const result = await productCollection.findOne(query);
        res.send(result);
      })

      // Delete a Single item
      app.delete('/products/:id', async(req, res) => {
        const id = req.params.id;
        const query = { _id: objectId(id) }
        const result = await productCollection.deleteOne(query);
        res.send(result);
      })

      
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("I am from Server");
});

app.listen(port, () => {
    console.log('Listening to', port);
});
