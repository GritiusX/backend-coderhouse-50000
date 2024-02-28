const HTTP_RESPONSES = require("../constants/http-responses.constant.js");
const ProductManager = require("../dao/fs/ProductManager.js");
const path = require("path");
const productManager = new ProductManager();
productManager.path = path.join(__dirname, "..", "json", "products.json");

async function controllerGetProducts(req, res) {
	try {
		const { limit } = req.query;
		let products = productManager.getProducts();
		if (limit) {
			let limitProducts = [...products.slice(0, limit)];
			return res.status(HTTP_RESPONSES.SUCCESS).json({
				status: HTTP_RESPONSES.SUCCESS,
				length: products.length,
				products: limitProducts,
			});
		}
		return res.status(HTTP_RESPONSES.SUCCESS).json({
			status: HTTP_RESPONSES.SUCCESS,
			length: products.length,
			products: products,
		});
	} catch (err) {
		res
			.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
			.json({ status: "error", err });
		throw new Error("controllerGetProducts", err.message);
	}
}

async function controllerGetProductById(req, res) {
	try {
		const { pid } = req.params;
		let product = productManager.getProductById(parseInt(pid));

		if (product) {
			return res
				.status(HTTP_RESPONSES.SUCCESS)
				.json({ status: HTTP_RESPONSES.SUCCESS, product: product });
		}

		return res.status(HTTP_RESPONSES.NOT_FOUND).json({
			status: HTTP_RESPONSES.NOT_FOUND,
			product: `There is no product with id: ${pid}`,
		});
	} catch (err) {
		throw new Error("controllerGetProductById", err.message);
	}
}

async function controllerAddProduct(req, res) {
	try {
		let addedProduct = productManager.addProduct(req.body);
		return res
			.status(HTTP_RESPONSES.CREATED)
			.json({ status: HTTP_RESPONSES.CREATED, payload: addedProduct });
	} catch (err) {
		throw new Error("controllerAddProduct", err.message);
	}
}
async function controllerUpdateProduct(req, res) {
	const { pid } = req.params;
	const { title, description, code, price, stock, status, thumbnails } =
		req.body;
	try {
		if (!title || !description || !code || !price || !stock || !thumbnails) {
			return res.status(HTTP_RESPONSES.BAD_REQUEST).json({
				status: HTTP_RESPONSES.BAD_REQUEST,
				payload: "Bad request",
			});
		}

		let updatedProduct = productManager.updateProduct(parseInt(pid), req.body);
		return res.status(HTTP_RESPONSES.SUCCESS).json({
			status: HTTP_RESPONSES.SUCCESS,
			message: "Updated successfully",
			payload: updatedProduct,
		});
	} catch (err) {
		throw new Error("controllerUpdateProduct", err.message);
	}
}
async function controllerDeleteProduct(req, res) {
	const { pid } = req.params;
	try {
		const productToDelete = productManager.deleteProduct(parseInt(pid));
		if (!productToDelete) {
			return res.status(HTTP_RESPONSES.NOT_FOUND).json({
				status: HTTP_RESPONSES.NOT_FOUND,
				payload: `There is no product with this Id: ${pid}`,
			});
		}
		return res.status(HTTP_RESPONSES.SUCCESS).json({
			status: HTTP_RESPONSES.SUCCESS,
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
