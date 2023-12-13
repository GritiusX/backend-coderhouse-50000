const path = require("node:path");
const express = require("express");
const ProductManager = require("../class/ProductManager.js");
const app = express();
const productManager = new ProductManager();
productManager.path = path.join(__dirname, "..", "json", "write.json");

app.use(express.json()); //con esto puede recibir json
app.use(express.urlencoded({ extended: true })); // con esto puede recibir parametros por url

app.get("/test", (req, res) => {
	res.json({ msg: "test successfully working" });
});

app.get("/products", (req, res) => {
	const { limit } = req.query;
	let products = productManager.getProducts();
	if (limit) {
		let limitProducts = [...products.slice(0, limit)];
		return res
			.status(200)
			.json({ status: 200, length: products.length, products: limitProducts });
	}
	return res
		.status(200)
		.json({ status: 200, length: products.length, products: products });
});
app.get("/products/:pid", (req, res) => {
	const { pid } = req.params;
	let product = productManager.getProductById(parseInt(pid));

	if (product) {
		return res.status(200).json({ status: 200, product: product });
	}

	return res
		.status(404)
		.json({ status: 404, product: `There is no product with id: ${pid}` });
});

const PORT = 8080;
app.listen(PORT, () => {
	console.log("listening on: ", PORT);
});
