const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  thoughtTitle: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
    trim: true,
  },
  thoughtPlace: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
    trim: true,
  },
  thoughtAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  thoughtImage: {
    type: String,
    trim: true,
  },
  rate: {
    type: Int
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  business: {
    type: Schema.Types.ObjectId,
    ref: 'Business',
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
