const { Schema, model } = require("mongoose");
const Thought = require('./Thought');
// const Cocktail = require('./Cocktail');

const businessSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  phoneNumber: {
    type: String,
  },
  bio: {
    type: String,
    maxlength: 500,
  },
//   likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  image: [String],
  website: String,
  location: String,
  thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
//   cocktails: [{ type: Schema.Types.ObjectId, ref: "Cocktail" }],
});

const Business = model("Business", businessSchema);

module.exports = Business;