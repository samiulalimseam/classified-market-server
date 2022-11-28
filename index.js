const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const jwt = require('jsonwebtoken');

// middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.flmxcne.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const categoriesCollection = client.db('saveyou-db').collection('categories');
const productsCollection = client.db('saveyou-db').collection('products');
const locationCollection = client.db('saveyou-db').collection('locations');
const conditionCollection = client.db('saveyou-db').collection('product-conditions');
const orderCollection = client.db('saveyou-db').collection('orders');

async function run(){
try{

   // get category list by array
   app.get('/categories/', async (req,res)=>{
      const query = {}
      const result = await categoriesCollection.find(query).toArray()
      res.send(result)

   })

   // add new product to db
   app.post('/addproduct', async (req,res)=>{
      const product = req.body;
      const result = await productsCollection.insertOne(product);
      res.send(result);
   })
   // add new product to db
   app.post('/addorder', async (req,res)=>{
      const product = req.body;
      const result = await orderCollection.insertOne(product);
      res.send(result);
   })

   // get product list
   app.get('/products', async(req,res)=>{
      const query = {};
      const result = await productsCollection.find(query).toArray()
      res.send(result);
   })
   // get order list
   app.get('/orders', async(req,res)=>{
      const query = {};
      const result = await orderCollection.find(query).toArray()
      res.send(result);
   })
   // get product searched list
   app.get('/search/:id', async(req,res)=>{
      const query = { salePrice: req.params.id};
      const result = await productsCollection.find(query).toArray()
      console.log(query);
      res.send(result);
   })

   // get loations
   app.get('/locations',async (req,res)=>{
      const query = {};
      const result = await locationCollection.find(query).toArray()
      res.send(result);
   })
   // get conditions
   app.get('/conditions',async (req,res)=>{
      const query = {};
      const result = await conditionCollection.find(query).toArray()
      res.send(result);
   })
   // get products by category
   app.get('/category/:id', async (req,res)=>{
      const query = {category: req.params.id};
      const result = await productsCollection.find(query).toArray();
     res.send(result);
      
   })




}
finally{
    
}


}
run().catch(error=> console.log(error));



app.get('/', async (req,res)=>{
   res.send('Server Running');
})
app.listen(port,()=>{
   console.log('Server running on port',port);
})

