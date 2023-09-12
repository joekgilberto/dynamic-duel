const mongoose = require("mongoose");
const Schema = mongoose.Schema

const BattleSchema = new Schema({
  superOneId: {type: String, required: true},
  superTwoId: {type: String, required: true},
  superOneName: {type: String, required: true},
  superTwoName: {type: String, required: true},
  superOneImage: {type: String, required: true},
  superTwoImage: {type: String, required: true},
  winner: {type: String, required: true},
  details: String,
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Likes',
  },
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comments',
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

},{
  timestamps: true
});

module.exports = mongoose.model("Battle", BattleSchema);