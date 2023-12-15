const ProductManager = require("../class/ProductManager.js");
const path = require("node:path");
const productManager = new ProductManager();
productManager.path = path.join(__dirname, "..", "json", "products.json");

async function controllerGetProducts(req, res) {
	try {
		const { limit } = req.query;
		let products = productManager.getProducts();
		if (limit) {
			let limitProducts = [...products.slice(0, limit)];
			return res.status(200).json({
				status: 200,
				length: products.length,
				products: limitProducts,
			});
		}
		return res
			.status(200)
			.json({ status: 200, length: products.length, products: products });
	} catch (err) {
		throw new Error("controllerGetProducts", err.message);
	}
}

async function controllerGetProductById(req, res) {
	try {
		const { pid } = req.params;
		let product = productManager.getProductById(parseInt(pid));

		if (product) {
			return res.status(200).json({ status: 200, product: product });
		}

		return res
			.status(404)
			.json({ status: 404, product: `There is no product with id: ${pid}` });
	} catch (err) {
		throw new Error("controllerGetProductById", err.message);
	}
}

async function controllerAddProduct(req, res) {
	try {
		let addedProduct = productManager.addProduct(req.body);
		return res.status(200).json({ status: 200, payload: addedProduct });
	} catch (err) {
		throw new Error("controllerAddProduct", err.message);
	}
}
async function controllerUpdateProduct(req, res) {
	const { pid } = req.params;
	try {
		let updatedProduct = productManager.updateProduct(parseInt(pid), req.body);
		return res.status(200).json({ status: 200, payload: updatedProduct });
	} catch (err) {
		throw new Error("controllerUpdateProduct", err.message);
	}
}
async function controllerDeleteProduct(req, res) {
	const { pid } = req.params;
	try {
		const productToDelete = productManager.deleteProduct(parseInt(pid));
		if (!productToDelete) {
			return res.status(404).json({
				status: 404,
				payload: `There is no product with this Id: ${pid}`,
			});
		}
		return res.status(200).json({
			status: 200,
			payload: `Product Id: ${pid} has been successfully deleted`,
		});
	} catch (err) {
		throw new Error("controllerUpdateProduct", err.message);
	}
}

module.exports = {
	controllerGetProducts,
	controllerGetProductById,
	controllerAddProduct,
	controllerUpdateProduct,
	controllerDeleteProduct,
};
