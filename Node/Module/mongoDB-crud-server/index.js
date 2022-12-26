const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// username: adminUser
// password: OzKyd3H27GkuW06b

const uri = "mongodb+srv://adminUser:OzKyd3H27GkuW06b@cluster0.u8ama.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect(err => {
//   const collection = client.db("test").collection("users");
//   // perform actions on the collection object
//   console.log('Hitting the Database');

//   const user = {
//       name : "Hasan",
//       email: "Hasanbd150@gmail.com",
//       phone: "+8801677317170"
//   }
//   collection.insertOne(user)
//   .then(() => {
//       console.log('Insert Successful');
//   })

// //   client.close();
// });

async function run() {
    try {
      await client.connect();
      const database = client.db("test");
      const userCollection = database.collection("users");
      
      // post API
      app.post('/users', async(req, res) => {
          const newUser = req.body;
          const result = await userCollection.insertOne(newUser);
          console.log('Got new user', req.body);  
          console.log(result);
          res.send(newUser);
      })

    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Crud server running');
})

app.listen(port, () => {
    console.log('Listening to', port);
})