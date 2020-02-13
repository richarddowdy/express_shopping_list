const express = require("express");
const items = require('./fakeDb');
const middleware = require("./middleware");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/items", function (req, res, next) {
  return res.send(items);
})

app.post("/items", function (req, res, next) {
  
  let newFruit = {
    name: req.body.name,
    price: req.body.price
  }

  items.push(newFruit)
  console.log(items)
  return res.send({"added": newFruit});
})

app.get("/items/:name",function(req, res, next){
  
  let itemName = req.params.name
  console.log(itemName);

  for (item of items){
    console.log(item);
    if(item.name === itemName){
      return res.send(item)
    }
  }
})

app.patch("/items/:name", function(req, res){
  let currentItem = req.params.name
  
  for (item of items){
    if(item.name === currentItem){
      item.name = req.body.name,
      item.price = req.body.price
      return res.send(item);
    }
  }
})

app.delete("/items/:name", function(req, res){
  let currentItem = req.params.name
  for(let i = 0; i < items.length; i++){
    if(items[i].name === currentItem){
      items.splice(i,1);
      return res.send(items);
    }
  }
})










module.exports = app;