const express = require('express');


const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dressStoreRoutes = express.Router();

const DressStore = require('./model/DressStore.model');


app.use(cors());
app.use(bodyParser.json());



mongoose.connect('mongodb+srv://morshedsiddiqui05:GTzAfOl9AtWb0rsz@cluster0.oy3dji7.mongodb.net/?retryWrites=true&w=majority');

const connect = mongoose.connection;

 connect.once('open', ()=>{
     console.log('connect')
 })

  
  // Set up CORS to allow cross-origin requests
  app.use(cors());
  
  const controller = require('./controller');



  app.use(express.json());

  // Create a new product
  app.post('/products', controller.createProduct);
  
  // Get all products
  app.get('/products', controller.getAllProducts);
  
  // Get a product by ID
  app.get('/products/:id', controller.getProductById);
  
  // Update a product by ID
  app.put('/products/:id', controller.updateProduct);
  
  // Delete a product by ID
  app.delete('/products/:id', controller.deleteProduct);
  
  // Delete all product by ID
  app.delete('/products', controller.deleteAllProducts);
  
  app.get('/products?name=[kw]', controller.findProductsBySubstring);






  // Start the Express server
  app.listen(8081, ()=>{
    console.log("the server is running on 8081......")
})
  

app.use(dressStoreRoutes);
