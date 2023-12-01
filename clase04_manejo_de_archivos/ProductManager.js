const fs = require("fs");
const path = require("path");

class ProductManager {
	constructor() {
		this.products = [];
		this.path = path.join(__dirname, "write.json");
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

		const productIndex = this.products.findIndex(
			(product) => product.id === productToUpdate.id
		);

		this.products[productIndex] = updatedProduct;

		this.#writeFile(this.products);

		console.log("Product updated successfully: ", updatedProduct);
		return updatedProduct;
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
		const productToFind = this.products.find((product) => product.id === id);

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
			return console.log("Product Found: ", productToFind);
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

const productManager = new ProductManager();
const productToBeAdded = {
	title: "Product 1",
	description: "Description 1",
	price: 111,
	thumbnail: "someUrl.com",
	code: "111",
	stock: 111,
};
const productToBeAdded2 = {
	title: "Product 2",
	description: "Description 2",
	price: 222,
	thumbnail: "someUrl2.com",
	code: "222",
	stock: 222,
};
const productToBeAdded3 = {
	title: "Product 3",
	description: "Description 3",
	price: 333,
	thumbnail: "someUrl3.com",
	code: "222",
	stock: 333,
};
const productToBeAdded4 = {
	title: "Product 4",
	description: "Description 4",
	price: 444,
	thumbnail: "someUrl4.com",
	code: "444",
	stock: 444,
};
productManager.addProduct(productToBeAdded);
productManager.addProduct(productToBeAdded2);
productManager.addProduct(productToBeAdded3);
productManager.addProduct(productToBeAdded4);
console.log("=============");
console.log("=============");
productManager.getProductById(2);
productManager.getProductById(6);

//Please use this Object to update any product:
const dataToUpdate = {
	title: "NEW TITLE OF THE PRODUCT 1 !!!!!",
	price: 66666,
};
productManager.updateProduct(1, dataToUpdate);

productManager.getProducts();
console.log("=============");

const productToBeDeleted = {
	title: "Product to be DELETED 5",
	description: "Description 5",
	price: 555,
	thumbnail: "someUrl5.com",
	code: "555",
	stock: 555,
};
productManager.addProduct(productToBeDeleted); //first add this product
console.log("=============");
productManager.deleteProduct(4); // then use this function to check that deletes
