const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  fullName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  phoneNumber: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  medicalCondition: {
    type: String,
    default: ''
  },
  specificConditions: {
    type: [String],
    default: []
  },
  otherCondition: {
    type: String,
    default: ''
  }
});

const profileModel = mongoose.model("profile", profileSchema);
module.exports = { profileModel, profileSchema };
