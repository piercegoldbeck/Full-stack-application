const express = require("express");
const commentModel = require("../models/comment");
const router = express.Router();

// my post route is 
router.post( "/", async (req, res, next) => {
    req.comment = new commentModel();
    next();
  },
  saveCommentAndRedirect()
);

router.get("/edit/:id", async (req, res) => {
  const comment = await commentModel.findById(req.params.id);
  res.render("comments/edit", { comment: comment });
});

router.put("/:id", async (req, res, next) => {
  req.comment = await commentModel.findById(req.params.id);
  next();
},
saveCommentAndRedirect()
);

router.delete("/:id", async (req, res) => {
  await commentModel.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

function saveCommentAndRedirect() {
    return async (req, res) => {
      let comment = req.comment;
      comment.name = req.body.name;
      comment.message = req.body.message;
      try {
        comment = await comment.save();
        res.redirect('/');
      } catch (e) {
        console.log("error", e);
        res.redirect('/');
      }
    };
  }
  
  module.exports = router;