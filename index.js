const express =require('express');
const app = express();
const cors = require('cors');
const port =process.env.PORT || 5000
require('dotenv').config()
//middleware
app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mfnurby.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    const itemCollection=client.db("SustainableDb").collection("item")
    const reviewCollection=client.db("SustainableDb").collection("review")
    const cartCollection=client.db("SustainableDb").collection("carts")

    app.get('/item',async(req,res)=>{
      const result=await itemCollection.find().toArray()
      res.send(result)
    })

    app.get('/review',async(req,res)=>{
      const result=await reviewCollection.find().toArray()
      res.send(result)
    })
    app.get('/carts',async(req,res)=>{
      const result=await cartCollection.find().toArray()
      res.send(result)
    })

    //cart collection
    app.post('/carts',async(req,res)=>{
      const cartItem=req.body;
      const result=await cartCollection.insertOne(cartItem)
      res.send(result)
    })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('Boss is waiting')
})
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})