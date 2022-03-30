const express = require("express");

const app = express();

const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://root:root@cluster0.elgoi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);

var collection;

async function initDB(){
   await client.connect();
  const db = client.db("product_db");
   collection = db.collection('product_stock');
}

//INSERT
app.post("/upload/product",async (req,res)=>{
    const product = req.body;
    const insertResult = await collection.insertOne(product)
    res.end(insertResult)
})

//UPADTE
app.patch("/products/update", (req,res)=>{
    let {updated} = req.body
    try{
    await collection.updateOne({id:updated.id},{$set:updated})
    res.statusCode(200)
      res.end("Updated Successfully")
     }
    catch(e){
      res.statusCode(500)
      res.end("Failed to update")
     }
})

//DELETE
app.delete("/products/:id",(req,res)=>{
   let {id} = req.params;
    try{
    await collection.deleteOne({_id:id})
    res.statusCode(200)
      res.end("Deleted Successfully")
     }
    catch(e){
      res.statusCode(500)
      res.end("Failed to delete")
     }
})

//GET
app.get("/products/:id",(req,res)=>{
    try{
    const pro = await collection.find({_id:id})
    res.statusCode(200)
      res.json(pro)
     }
    catch(e){
      res.statusCode(500)
      res.end("Failed to get")
     }
})

//GET
app.get("/products/all",(req,res)=>{
    try{
    const pro = await collection.find({})
    res.statusCode(200)
      res.json(pro)
     }
    catch(e){
      res.statusCode(500)
      res.end("Failed to get")
     }
})

app.listen(8080,()=>{
  console.log("server started @ 8080")
  initDB();
})