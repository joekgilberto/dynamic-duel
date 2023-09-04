///////////////////////////////
// DEPENDENCIES
////////////////////////////////
const mongoose = require("mongoose");
const Schema = mongoose.Schema
///////////////////////////////
// MODELS
////////////////////////////////
const BattleSchema = new Schema({
  superOneName: String,
  superTwoName: String,
  superOneImg: String,
  superTwoImg: String,
  winner: String,
  details: String,
  creator: Schema.Types.ObjectId

},{
  timestamps: true
});

module.exports = mongoose.model("Battle", BattleSchema);