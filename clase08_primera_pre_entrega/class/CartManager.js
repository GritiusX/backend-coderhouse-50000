const fs = require("fs");
const path = require("path");

class CartManager {
	constructor(url) {
		this.carts = [];
		this.path = url || path.join(__dirname, "cart.json");
	}
	#validateCart(cart) {
		try {
			let cartValidation = Array.isArray(cart) ? true : false;
			if (!cartValidation) {
				return false;
			}
			return true;
		} catch (err) {
			throw new Error("validateCart", err.message);
		}
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
	#getNextId() {
		this.carts = this.#readFile();
		const usedIds = new Set(this.carts.map((cart) => cart.id));

		let newId = 1;
		while (usedIds.has(newId)) {
			newId++;
		}

		return newId;
	}

	addCart = () => {
		try {
			const fileExists = this.#fileExists(this.path);
			if (fileExists) {
				const cartId = this.#getNextId();
				const cartToBeAdded = [];

				this.carts = this.#readFile();
				this.carts.push({ id: cartId, products: cartToBeAdded });
				this.#writeFile(this.carts);
				return this.carts;
			}
			console.log("addCart failed - Cart file not found");
			return null;
		} catch (err) {
			throw new Error("addCart", err.message);
		}
	};

	getCartById = (cartId) => {
		try {
			const fileExists = this.#fileExists(this.path);
			if (fileExists) {
				this.carts = this.#readFile();
				const foundCart = this.carts.find((cart) => cart.id === cartId);
				if (foundCart) return foundCart;
				return null;
			}
			console.log("getCartById failed - Cart file not found");
			return false;
		} catch (err) {
			throw new Error("getCartById", err.message);
		}
	};

	addProductToCartById = (ids, cart) => {
		try {
			const { cid, pid } = ids;
			this.carts = this.#readFile();

			let foundCart = this.carts.find((cart) => cart.id === parseInt(cid));

			if (foundCart) {
				let cartProduct = foundCart.products.find(
					(prod) => prod.product === parseInt(pid)
				);

				if (cartProduct) {
					cartProduct.quantity = cart.quantity;
					this.#writeFile(this.carts);
					return cartProduct;
				}

				foundCart.products.push({
					product: parseInt(pid),
					quantity: cart.quantity,
				});
				this.#writeFile(this.carts);
				return foundCart.products.slice(-1)[0];
			}
			return undefined;
		} catch (err) {
			throw new Error("addProductToCartById", err);
		}
	};
}

module.exports = CartManager;
