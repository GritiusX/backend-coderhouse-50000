const { Schema, model } = require("mongoose");

const cartsCollection = "carts";

const cartsSchema = new Schema({
	/* userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
	products: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
	total: { type: Number, required: true },
	createdAt: { type: Date, default: Date.now }, */
});

const cartModel = model(cartsCollection, cartsSchema);
module.exports = { cartModel };
