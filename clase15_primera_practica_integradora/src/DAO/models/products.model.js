const { Schema, model } = require("mongoose");

const productsCollection = "products";

const productsSchema = new Schema({});

const productsModel = model(productsCollection, productsSchema);

module.exports = { productsModel };
