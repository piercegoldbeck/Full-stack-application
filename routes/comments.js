const express = require("express");
const commentModel = require("../models/comment");
const router = express.Router();

// this route creates a new comment
router.post( "/", async (req, res, next) => {
    req.comment = new commentModel();
    next();
  },
  saveCommentAndRedirect()
);

// this get route allows me to edit a comment
router.get("/edit/:id", async (req, res) => {
  const comment = await commentModel.findById(req.params.id);
  res.render("comments/edit", { comment: comment });
});

//this route allows me to update the information of a comment which matches the id passed as a param and then go to the index page 
router.put("/:id", async (req, res, next) => {
  req.comment = await commentModel.findById(req.params.id);
  next();
},
saveCommentAndRedirect()
);

//this route allows me to delete a comment by id and then redirect to the index page
router.delete("/:id", async (req, res) => {
  await commentModel.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

//this function allows me to save/update a comment and redirect to the index page
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