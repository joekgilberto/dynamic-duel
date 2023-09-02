const express = require('express')
const {Battles} = require('../models')

// EXPORT Controller Action
module.exports = {
	index,
	create,
	show,
    delete: destroy,
    update
}

///////////////////////////////
// CONTROLLERS
////////////////////////////////

// BATTLE INDEX ACTION
async function index(req,res,next) {
	try {
    // get all battles
    res.status(200).json(await Battles.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};

// BATTLE CREATE ACTION
async function create(req,res,next) {
  try {
    // create new battle
    res.status(201).json(await Battles.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};

// BATTLE SHOW ACTION
async function show(req,res,next) {
    try {
        // send one battle
        res.status(200).json(await Battles.findById(req.params.id));
      } catch (error) {
        //send error
        res.status(400).json(error);
      }
};

// BATTLE DESTROY ACTION 
async function destroy(req,res,next) {
    try {
        // send one battle
        res.status(200).json(await Battles.findByIdAndRemove(req.params.id));
      } catch (error) {
        //send error
        res.status(400).json(error);
      }
};

// BATTLE UPDATE ACTION
async function update(req,res,next) {
    try {
        // send one battle
        res.status(200).json(await Battles.findByIdAndUpdate(req.params.id, req.body, { new: true }));
      } catch (error) {
        //send error
        res.status(400).json(error);
      }
};