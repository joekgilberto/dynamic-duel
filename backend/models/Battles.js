///////////////////////////////
// DEPENDENCIES
////////////////////////////////
const mongoose = require("mongoose");
const Schema = mongoose.Schema
///////////////////////////////
// MODELS
////////////////////////////////
const BattleSchema = new Schema({
  superOneId: String,
  superTwoId: String,
  superOneName: String,
  superTwoName: String,
  superOneImage: String,
  superTwoImage: String,
  winner: String,
  details: String,
  comments: Array,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }

},{
  timestamps: true
});

module.exports = mongoose.model("Battle", BattleSchema);