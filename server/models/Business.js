const { Schema, model } = require("mongoose");
<<<<<<< HEAD
// const Review = require('./Review');
=======
const Thought = require('./Thought');
>>>>>>> 2b5f35bf56abea023189c627d15f053d248f0a28
// const Cocktail = require('./Cocktail');

const businessSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  phoneNumber: {
    type: String,
    unique: true,
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

const Business = model("BusinessProfile", businessSchema);

module.exports = Business;