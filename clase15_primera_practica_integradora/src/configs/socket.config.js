const { Server } = require("socket.io");
const axios = require("axios");

function setupSocket(httpServer) {
	const io = new Server(httpServer);

	// Set up event listeners
	io.on("connection", (socket) => {
		console.log("a user connected", socket.id);
		socket.on("chatIncoming", async (data) => {
			try {
				console.log(data);
				/* const response = await axios.post("/api/messages", { data });
				console.log("Data sent to /api/messages:", response.data); */
			} catch (error) {
				// Handle any errors that occur during the POST request
				console.error("Error sending data to /api/messages:", error);
			}
		});
	});
}

module.exports = setupSocket;
