///////////////////////////////
// DEPENDENCIES
////////////////////////////////
const mongoose = require("mongoose");
const Schema = mongoose.Schema
///////////////////////////////
// MODELS
////////////////////////////////
const BattleSchema = new Schema({
  superOneName: {type: String},
  superTwoName: {type: String},
  superOneImg: {type: String},
  superTwoImg: {type: String},
  winner: {type: String},
  details: {type: String},
  creator: {type: Schema.Types.ObjectId}

},{timestamps: true});

module.exports = mongoose.model("Battle", BattleSchema);

