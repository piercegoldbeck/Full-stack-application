const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product");
const Comment = require("./models/comment");
const commentRouter =require("./routes/comments");
const productRouter = require("./routes/products");
const methodOverride = require("method-override");
const app = express();

mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: "desc" });
  const comments = await Comment.find().sort({ createdAt: "asc" });
  res.render("products/index", { products: products, comments: comments });
});

app.get('/seed', async (req, res) => {
  const newProducts =
    [
      {
        name: 'KasKade',
        description: 'This demonstated the peace and tranquility of the ocean',
        img: 'https://i.imgur.com/569TYsz.jpg',
        price: 500,
        qty: 1
      }, {
        name: 'Up Above and Beyond',
        description: 'This gathers a perspective of being generally high on life',
        img: 'https://i.imgur.com/H5RsJcj.jpg',
        price: 250,
        qty: 1
      }, {
        name: 'This photo is fake',
        description: 'https://i.imgur.com/g3rRU4G.jpg',
        img: 'This demonstrates the artistic creativity when applying photoshop to a picture',
        price: 600,
        qty: 1
      },
      {
        name: ' The PriceiZControll3dby U',
        description: 'I guess this looks really cool but how much is it really worth',
        img: 'https://i.imgur.com/sNcoI4k.jpg',
        price: 6000,
        qty: 1
      }
    ]

  try {
    const seedItems = await Product.create(newProducts)
    res.send(seedItems)
  } catch (err) {
    res.send(err.message)
  }
})


app.use("/products", productRouter);
app.use("/comments", commentRouter)

app.listen(3000);
