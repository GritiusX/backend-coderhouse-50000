const CartManager = require("../class/CartManager.js");
const ProductManager = require("../class/ProductManager.js");
const path = require("path");
const cartsUrl = path.join(__dirname, "..", "json", "cart.json");
const productUrl = path.join(__dirname, "..", "json", "products.json");
const cartManager = new CartManager(cartsUrl);
const productManager = new ProductManager(productUrl);

async function controllerAddCart(req, res) {
	try {
		let addedCart = cartManager.addCart(req.body);
		if (addedCart) {
			return res
				.status(200)
				.json({ status: 200, msg: "Cart has been added", payload: addedCart });
		}
		return res.status(404).json({ status: 404, payload: `Cart was not added` });
	} catch (err) {
		throw new Error("controllerAddCart", err.message);
	}
}
async function controllerGetCartById(req, res) {
	try {
		let { cid } = req.params;
		let foundCart = cartManager.getCartById(parseInt(cid));
		if (foundCart) {
			return res
				.status(200)
				.json({ status: 200, msg: "Cart has been found", payload: foundCart });
		}
		return res
			.status(404)
			.json({ status: 404, payload: `There isn't a cart with Id: ${cid}` });
	} catch (err) {
		throw new Error("controllerAddCart", err.message);
	}
}
async function controllerAddProductToCartById(req, res) {
	try {
		const response = cartManager.addProductToCartById(req.params, req.body);
		if (response)
			return res.status(200).json({
				status: 200,
				msg: "product updated successfully",
				payload: response,
			});
		return res
			.status(404)
			.json({ status: 404, msg: "cart or product not found" });
	} catch (err) {
		throw new Error("controllerAddProductToCart", err.message);
	}
}

module.exports = {
	controllerAddCart,
	controllerGetCartById,
	controllerAddProductToCartById,
};
