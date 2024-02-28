const { Server } = require("socket.io");
const axios = require("axios");

function setupSocket(httpServer) {
	const io = new Server(httpServer);

	// Set up event listeners
	io.on("connection", async (socket) => {
		try {
			const response = await axios.get("http://localhost:8080/api/messages");
			io.emit("allMessagesGET", response.data.allMessages);
		} catch (error) {
			return console.error("Error sending data to /api/messages:", error);
		}
		socket.on("chatIncoming", async (data) => {
			try {
				const response = await axios.post(
					"http://localhost:8080/api/messages",
					data
				);
				return;
			} catch (error) {
				return console.error("Error sending data to /api/messages:", error);
			}
		});
	});
}

module.exports = setupSocket;
