const fs = require("fs");
const path = require("path");
class ProductManager {
	constructor(url) {
		this.products = [];
		this.path = url || path.join(__dirname, "write.json");
	}
	#validateProduct(product) {
		const keysToCheck = [
			"title",
			"description",
			"price",
			"thumbnail",
			"code",
			"stock",
		];
		const hasAllKeys = keysToCheck.every((key) =>
			Object.keys(product).includes(key)
		);
		const isEmpty = (value) =>
			value === "" || value === undefined || value === null;
		const emptyKeys = Object.keys(product).filter((key) =>
			isEmpty(product[key])
		);
		const validateProductCodePropety = this.products.find(
			(insideProduct) => insideProduct.code === product.code
		)
			? true
			: false;

		if (emptyKeys.length > 0 || !hasAllKeys) {
			console.log(
				"The product you are trying to add has empty data, please check your settings and try again"
			);
			return false;
		}
		if (validateProductCodePropety) {
			console.log(
				`'${product.title}' code: '${product.code}' has already been registered by another product`
			);
			return false;
		}
		return true;
	}
	#getNextId() {
		const usedIds = new Set(this.products.map((product) => product.id));

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
			//console.log("Products found: ", JSON.parse(fileContent)); //-- only used for testing purposes
			return JSON.parse(fileContent);
		} catch (error) {
			console.error("Error reading file:", error.message);
			return [];
		}
	}

	#writeFile(data) {
		try {
			fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
			console.log("Writing products: ", JSON.stringify(data, null, 2));
			return true;
		} catch (error) {
			console.error("Error writing file:", error.message);
			return false;
		}
	}

	#updateProduct(productToUpdate, dataToUpdate) {
		const updatedProduct = { ...productToUpdate, ...dataToUpdate };

		const products = this.#readFile();

		const productIndex = products.findIndex(
			(product) => product.id === productToUpdate.id
		);

		if (productIndex !== -1) {
			products[productIndex] = updatedProduct;

			this.#writeFile(products);

			console.log("Product updated successfully: ", updatedProduct);
			return updatedProduct;
		}

		console.log("There is no product with this id");
		return null;
	}

	getProducts = () => {
		let fileExist = this.#fileExists(this.path);

		if (fileExist) {
			console.log("File exists");
			return this.#readFile();
		} else {
			console.log("File does not exist => creating file...");
			const success = this.#writeFile(this.products);
			return success ? this.products : [];
		}
	};

	addProduct = (product) => {
		let validateProductToAdd = this.#validateProduct(product);
		let productId = this.#getNextId();

		if (validateProductToAdd) {
			const productWithId = { ...product, id: productId };
			console.log("Item added successfully");
			this.products.push(productWithId);
			this.#writeFile(this.products);
			return true;
		}

		console.log("Item not added:", validateProductToAdd);
		return false;
	};

	updateProduct = (id, dataToUpdate) => {
		const products = this.#readFile();
		const productToFind = products.find((product) => product.id === id);

		if (productToFind) {
			return this.#updateProduct(productToFind, dataToUpdate);
		}

		console.log("There is no product with this id");
		return null;
	};

	getProductById = (id) => {
		const products = this.#readFile();

		const productToFind = products.find((product) => product.id === id);

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
