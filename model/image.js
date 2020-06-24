const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: 'my image',
  },
});

module.exports = mongoose.model('image', imageSchema);
