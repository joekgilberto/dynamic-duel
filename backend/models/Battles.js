///////////////////////////////
// DEPENDENCIES
////////////////////////////////
const mongoose = require("mongoose");
const Schema = mongoose.Schema
///////////////////////////////
// MODELS
////////////////////////////////
const BattleSchema = new Schema({
  superOne: String,
  superTwo: String,
  winner: String,
  details: String,
  comments: Array,
  user: Schema.Types.ObjectId

},{
  timestamps: true
});

module.exports = mongoose.model("Battle", BattleSchema);