const socket = io();
const messageInput = document.querySelector("#chat-input");
const userInput = document.querySelector("#user-input");
const messageForm = document.querySelector("#message-form");

socket.on("allMessagesGET", (messages) => {
	const messagesDiv = document.querySelector("#messages-container");
	let html = "";
	for (const msg in messages) {
		if (messages.hasOwnProperty(msg)) {
			const message = messages[msg];
			html += `<div class="socket-message">
            <p>${message.user}:</p>
            <p>${message.message}</p>
            </div>
            `;
		}
	}
	messagesDiv.innerHTML = html;
});
const createProduct = () => {
	try {
		if (userInput.value !== "" && messageInput.value !== "") {
			const chatMessage = {
				user: userInput.value,
				message: messageInput.value,
			};

			socket.emit("chatIncoming", chatMessage); //envia el message al socket.on

			messageInput.value = "";
			return;
		}
	} catch (error) {
		throw new Error(error);
	}
};
