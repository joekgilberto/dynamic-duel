///////////////////////////////
// DEPENDENCIES
////////////////////////////////
const mongoose = require("mongoose");
const Schema = mongoose.Schema
///////////////////////////////
// MODELS
////////////////////////////////
const BattleSchema = new Schema({
  superOneId: {type: String, required: true},
  superTwoId: {type: String, required: true},
  superOneName: {type: String, required: true},
  superTwoName: {type: String, required: true},
  superOneImage: {type: String, required: true},
  superTwoImage: {type: String, required: true},
  winner: {type: String, required: true},
  details: String,
  comments: {type: Array, default: []},
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

},{
  timestamps: true
});

module.exports = mongoose.model("Battle", BattleSchema);