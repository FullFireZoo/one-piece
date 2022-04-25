const express = require("express");
const {getAllData, getOneData, setData, deleteData, updateData} = require("../firebase");
const {isUser} = require("../middlewares/isUser")
const api = express.Router();
// get ALL data
api.get("/:collection", async (req, res) => {
  const response = await getAllData(req.params.collection);
  res.json(response);
});

// get one document from collection

api.get("/:collection/:id", async (req, res) => {
  /* Destructuring the req.params object. */
  const { collection, id } = req.params;
  const response = await getOneData(collection, id);
  res.json(response);
});


api.post("/:collection",isUser , async (req, res) => {
  const { collection } = req.params;
  setData(collection,req.body )
  res.json(req.body);
});

//upadate document 

api.put("/:collection/:id",isUser, async (req, res) => {
  const { collection, id } = req.params;
  updateData(collection,id,req.body   )
  res.json(req.body);
});


// delete document
api.delete("/:collection/:id",isUser, async (req, res) => {
  const { collection, id } = req.params;
  deleteData(collection,id )
  res.json({message:'The document have being deleted : '+ id});
});

module.exports = { api };
