const fs = require("fs");
const path = require("path");
class ProductManager {
	constructor(url) {
		this.products = [];
		this.path = url || path.join(__dirname, "products.json");
	}
	#validateProduct(product) {
		try {
			this.products = this.#readFile();
			const { title, description, code, price, status, stock, thumbnails } =
				product;

			if (status === "" || status === undefined || status === null) {
				product.status = true;
			}
			if (!thumbnails) {
				product.thumbnails = [];
			}
			if (!title || !description || !code || !price || !stock) {
				console.log("There are main properties missing in this product");
				return false;
			}

			const validateProductCodePropety = this.products.find(
				(insideProduct) => insideProduct.code === product.code
			)
				? true
				: false;

			if (validateProductCodePropety) {
				console.log(
					`The product '${product.title}' with code: '${product.code}' has already been registered by another product`
				);
				return false;
			}
			return true;
		} catch (err) {
			throw new Error("validateProduct", err.message);
		}
	}
	#getNextId() {
		const products = this.#readFile();
		const usedIds = new Set(products.map((product) => product.id));

		let newId = 1;
		while (usedIds.has(newId)) {
			newId++;
		}

		return newId;
	}
	#fileExists(filePath) {
		return fs.existsSync(filePath);
	}
	#readFile() {
		try {
			const fileContent = fs.readFileSync(this.path, "utf8");
			return JSON.parse(fileContent);
		} catch (error) {
			console.error("Error reading file:", error.message);
			return [];
		}
	}

	#writeFile(data) {
		try {
			fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
			return true;
		} catch (error) {
			console.error("Error writing file:", error.message);
			return false;
		}
	}

	#updateProduct(productToUpdate, dataToUpdate) {
		const updatedProduct = { ...productToUpdate, ...dataToUpdate };

		this.products = this.#readFile();

		const productIndex = this.products.findIndex(
			(product) => product.id === productToUpdate.id
		);

		if (productIndex !== -1) {
			this.products[productIndex] = updatedProduct;

			this.#writeFile(this.products);

			console.log("Product updated successfully: ", updatedProduct);
			return updatedProduct;
		}

		console.log("There is no product with this id");
		return null;
	}

	getProducts = () => {
		let fileExist = this.#fileExists(this.path);

		if (!fileExist) {
			console.log("File does not exist => creating file...");
			const success = this.#writeFile(this.products);
			return success ? this.products : [];
		}
		console.log("File exists");
		return this.#readFile();
	};

	addProduct = (product) => {
		let validateProductToAdd = this.#validateProduct(product);
		let productId = this.#getNextId();
		this.products = this.#readFile();

		if (validateProductToAdd) {
			const productWithId = { ...product, id: productId };

			this.products.push(productWithId);
			this.#writeFile(products);
			console.log("Item added successfully");
			return true;
		}

		console.log("Item not added:", validateProductToAdd);
		return false;
	};

	updateProduct = (id, dataToUpdate) => {
		this.products = this.#readFile();
		const productToFind = this.products.find((product) => product.id === id);
		if (productToFind) {
			return this.#updateProduct(productToFind, dataToUpdate);
		}

		console.log("There is no product with this id");
		return null;
	};

	getProductById = (id) => {
		this.products = this.#readFile();

		const productToFind = this.products.find((product) => product.id === id);

		if (productToFind) {
			console.log("Product Found: ", productToFind);
			return productToFind;
		}

		return console.log("There is no product with this id");
	};

	deleteProduct = (id) => {
		let products = this.#readFile();
		const productIndex = products.findIndex((product) => product.id === id);

		if (productIndex !== -1) {
			const arrayWithoutProduct = products.filter(
				(product) => product.id !== id
			);

			this.#writeFile(arrayWithoutProduct);

			console.log("Product deleted successfully");
			return arrayWithoutProduct;
		}

		console.log("There is no product with this id");
		return null;
	};
}

module.exports = ProductManager;
