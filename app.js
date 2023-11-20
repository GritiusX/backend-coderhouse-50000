class ProductManager {
	constructor() {
		this.products = [];
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

	getProducts = () => {
		console.log(this.products);
		return this.products;
	};

	addProduct = (product) => {
		let validateProductToAdd = this.#validateProduct(product);
		let productId = this.#getNextId();
		if (validateProductToAdd) {
			const productWithId = { ...product, id: productId };
			console.log("item added successfully");
			return this.products.push(productWithId);
		}
		return console.log("item not added", validateProductToAdd);
	};

	getProductById = (id) => {
		const productToFind = this.products.find((product) => product.id === id);

		if (productToFind) {
			return console.log("Product Found: ", productToFind);
		}
		return console.log("there is no product with this id");
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
/* productManager.addProduct(productToBeAdded2);
productManager.addProduct(productToBeAdded3);
productManager.addProduct(productToBeAdded4);
console.log("=============");
console.log("=============");
productManager.getProductById(2);
productManager.getProductById(6); */

productManager.getProducts();
