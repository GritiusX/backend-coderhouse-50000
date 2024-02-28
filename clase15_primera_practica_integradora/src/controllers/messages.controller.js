const HTTP_RESPONSES = require("../constants/http-responses.constant.js");
const MessageManager = require("../dao/mongo/MessageManager.js");
const messageManager = new MessageManager();

async function controllerGetMessages(req, res) {
	try {
		const allMessages = await messageManager.getMessages();

		return res.status(HTTP_RESPONSES.SUCCESS).json({
			status: HTTP_RESPONSES.SUCCESS,
			length: allMessages.length ? allMessages.length : 0,
			allMessages: allMessages,
		});
	} catch (err) {
		res
			.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
			.json({ status: "error", err });
		throw new Error("controllerGetMessages", err.message);
	}
}

async function controllerGetMessagesById(req, res) {
	try {
		const { pid } = req.params;

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

async function controllerAddMessage(req, res) {
	try {
		const messageToAdd = await messageManager.addMessage(req.body);
		return res
			.status(HTTP_RESPONSES.CREATED)
			.json({ status: HTTP_RESPONSES.CREATED, payload: messageToAdd });
	} catch (err) {
		throw new Error("controllerAddMessage", err);
	}
}
async function controllerUpdateMessage(req, res) {
	const { pid } = req.params;
	const { message } = req.body;
	try {
		if (!message) {
			return res.status(HTTP_RESPONSES.BAD_REQUEST).json({
				status: HTTP_RESPONSES.BAD_REQUEST,
				payload: "Bad request",
			});
		}
		const messageToUpdate = messageManager.updateMessage(pid, message);

		return res.status(HTTP_RESPONSES.SUCCESS).json({
			status: HTTP_RESPONSES.SUCCESS,
			message: "Message edited successfully",
			payload: messageToUpdate,
		});
	} catch (err) {
		throw new Error("controllerUpdateProduct", err.message);
	}
}
async function controllerDeleteMessage(req, res) {
	const { pid } = req.params;
	try {
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
	controllerGetMessages,
	controllerGetMessagesById,
	controllerAddMessage,
	controllerUpdateMessage,
	controllerDeleteMessage,
};
