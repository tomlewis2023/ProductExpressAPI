const express = require("express");
const router = express.Router();
const products = require("../data/products");

//middleware
const myLogger = function (req, res, next) {
  console.log('LOGGED')
  console.log(req.body)
  next()
}

//get all products
router.get("/",myLogger, (req, res) => {
  // res.send('Get all products')
  try {
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//get product by id

router.get("/:id", (req, res) => {
  // res.send('Get all products')
  try {
    const productId = parseInt(req.params.id);
    const product = products.find((prod) => prod.id === productId);

    if (!product) {
      // Return a 404 if the product is not found
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//Post requests

router.post("/", myLogger, (req, res) => {
  // res.send('Get all products')
  try {
    if (!req.body)
      return res.status(404).json({ message: "Name and price are required" });
    //  console.log(req.body)
    const { name, price } = req.body;
    const newProduct = {
      id: products.length ? products[products.length - 1].id + 1 : 1,
      name: name,
      price: price,
    };

    products.push(newProduct);
    res.status(201).json({ message: "Product added", product: newProduct });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//update requests

router.patch("/:id", (req, res) => {
  // res.send('Get all products')
  try {
    const productId = parseInt(req.params.id);
    const product = products.find((prod) => prod.id === productId);

    if (!product) {
      // Return a 404 if the product is not found
      return res.status(404).json({ error: "Product not found" });
    }
    const { name, price } = req.body;
    if (name) product.name = name;
    if (price) product.price = price;

    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});


//delete request method

router.delete("/:id", (req, res) => {
  // res.send('Get all products')
  try {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(prod => prod.id === productId);

    if (productIndex == -1) {
      // Return a 404 if the product is not found
      return res.status(404).json({ error: "Product not found" });
    }
    const deleteProduct = products.splice(productIndex,1)


  res.status(200).json({message : "Product deleted " ,product: deleteProduct});
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});



module.exports = router;
