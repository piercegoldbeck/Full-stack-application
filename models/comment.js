const mongoose = require("mongoose");
const slugify = require("slugify");

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

//this function will run before validation for the model and create a slug 
commentSchema.pre("validate", function (next) {
    if (this.name) {
      this.slug = slugify(this.name, { lower: true, strict: true });
    }
  
    next();
  });

module.exports = mongoose.model("comment", commentSchema);