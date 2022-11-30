const express = require("express");
const productModel = require("../models/product");
const router = express.Router();


//this route allows me to go to the products new page
router.get("/new", (req, res) => {
  res.render("products/new", { product: new productModel() });
});

// this route allows me to go to the product edit page
router.get("/edit/:id", async (req, res) => {
  const p = await productModel.findById(req.params.id);
  res.render("products/edit", { product: p });
});

//this get route takes me to a product show page
router.get("/:slug", async (req, res) => {
  const product = await productModel.findOne({ slug: req.params.slug });
  if (product == null) res.redirect("/");
  res.render("products/show", { product: product });
});

//this post route allows me to create a new product
router.post( "/", async (req, res, next) => {
    req.product = new productModel();
    next();
  },
  saveproductAndRedirect("new")
);

//this put route allows me to update a product model and then saves the new product and then redirects me to the product show page
router.put("/:id", async (req, res, next) => {
    req.product = await productModel.findById(req.params.id);
    next();
  },
  saveproductAndRedirect("edit")
);

//this route allows me to delete a product by id on the index page and then go back to the orginal index page 
router.delete("/:id", async (req, res) => {
  await productModel.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

//this fuction allows me to save/update products and then redirect to the origianl index page 
function saveproductAndRedirect(path) {
  return async (req, res) => {
    let product = req.product;
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.qty = req.body.qty;
    product.img = req.body.img;
    try {
      product = await product.save();
      res.redirect(`/products/${product.slug}`);
    } catch (e) {
      console.log("error", e);
      res.render(`products/${path}`, { product: product });
    }
  };
}

module.exports = router;
