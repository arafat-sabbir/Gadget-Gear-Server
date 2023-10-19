const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient,ObjectId, ServerApiVersion } = require('mongodb');

// middleware

app.use(cors());
app.use(express.json());

// GadgetGear
// STu2gOSpwsC88fCa
// const uri = "mongodb://localhost:27017";



const uri = "mongodb+srv://GadgetGear:STu2gOSpwsC88fCa@cluster0.t245pno.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const brandCollection = client.db("brandDB").collection('brandCollection');
    const productCollection = client.db("productDB").collection('productCollection')

    app.get('/brand', async (req, res) => {
      const cursor = brandCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })
    app.get('/product/:brandname',async(req,res)=>{
      const brand = req.params.brandname;
      const query = {brandName:brand};
      const result = await productCollection.find(query).toArray();
      res.send(result)
    })
    app.get('/items/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) }
      const result = await productCollection.findOne(query);
      res.send(result)
  })

    app.post('/product',async(req,res)=>{
      const product = req.body;
      const result = await productCollection.insertOne(product)
      res.send(result)
    })

    app.put('/coffee/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const objects = { upsert: true };
      const updatedCoffee = req.body;
      const coffee = {
          $set: {
              name: updatedCoffee.name,
              chef: updatedCoffee.chef,
              supplier: updatedCoffee.supplier,
              taste: updatedCoffee.taste,
              category: updatedCoffee.category,
              detail: updatedCoffee.detail,
              photourl: updatedCoffee.photourl
          }
      }
      const result = await coffeeCollection.updateOne(filter, coffee, filter)
      res.send(result)
  })



    app.delete('/items/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await productCollection.deleteOne(query);
      res.send(result);

  })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('started a new Product shop')
})


app.listen(port, () => {
  console.log('new Product shop started successfuly at', port);
})