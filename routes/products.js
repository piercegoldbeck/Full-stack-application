const express = require("express");
const productModel = require("../models/product");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("products/new", { product: new productModel() });
});

router.get("/edit/:id", async (req, res) => {
  const p = await productModel.findById(req.params.id);
  res.render("products/edit", { product: p });
});

router.get("/:slug", async (req, res) => {
  const product = await productModel.findOne({ slug: req.params.slug });
  if (product == null) res.redirect("/");
  res.render("products/show", { product: product });
});

router.post( "/", async (req, res, next) => {
    req.product = new productModel();
    next();
  },
  saveproductAndRedirect("new")
);

router.put("/:id", async (req, res, next) => {
    req.product = await productModel.findById(req.params.id);
    next();
  },
  saveproductAndRedirect("edit")
);

router.delete("/:id", async (req, res) => {
  await productModel.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

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
