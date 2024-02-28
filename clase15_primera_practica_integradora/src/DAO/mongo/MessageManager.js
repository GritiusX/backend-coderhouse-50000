const { messagesModel } = require("../models/messages.model.js");

class MessageManager {
	#validateUser(chat) {
		try {
			const { user } = chat;

			if (user === "" || user === undefined || user === null) {
				return false;
			}

			return true;
		} catch (err) {
			throw new Error("validateUser", err.message);
		}
	}
	#updateProduct(productToUpdate, dataToUpdate) {
		const updatedProduct = { ...productToUpdate, ...dataToUpdate };

		const productIndex = this.products.findIndex(
			(product) => product.id === productToUpdate.id
		);

		if (productIndex !== -1) {
			this.products[productIndex] = updatedProduct;

			console.log("Product updated successfully: ", updatedProduct);
			return updatedProduct;
		}

		console.log("There is no product with this id");
		return null;
	}

	getMessages = async () => {
		const allMessages = await messagesModel.find();
		return allMessages;
	};

	addMessage = async (chat) => {
		let validateChatToAdd = this.#validateUser(chat);

		if (validateChatToAdd) {
			const chatToAdd = await messagesModel.create(chat);
			return chatToAdd;
		}

		console.log("User not valid or empty, can't send chat:", validateChatToAdd);
		return false;
	};

	updateMessage = async (id, dataToUpdate) => {
		const messageToUpdate = await messagesModel.findByIdAndUpdate(
			id,
			dataToUpdate
		);
		if (messageToUpdate) {
			return messageToUpdate;
		}

		console.log("There is no message with this id");
		return null;
	};

	getMessageById = (id) => {
		const productToFind = this.products.find((product) => product.id === id);

		if (productToFind) {
			console.log("Product Found: ", productToFind);
			return productToFind;
		}

		return console.log("There is no product with this id");
	};

	deleteMessage = (id) => {
		const productIndex = products.findIndex((product) => product.id === id);

		if (productIndex !== -1) {
			const arrayWithoutProduct = products.filter(
				(product) => product.id !== id
			);

			console.log("Product deleted successfully");
			return arrayWithoutProduct;
		}

		console.log("There is no product with this id");
		return null;
	};
}

module.exports = MessageManager;
