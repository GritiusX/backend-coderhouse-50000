const socket = io();
const messageInput = document.querySelector("#chat-input");
const userInput = document.querySelector("#user-input");
const messageForm = document.querySelector("#message-form");
const createProduct = () => {
	try {
		messageForm.addEventListener("submit", (e) => {
			e.preventDefault();
		});
		if (userInput.value !== "" && messageInput.value !== "") {
			const productObject = {
				user: userInput.value,
				message: messageInput.value,
			};

			socket.emit("chatIncoming", productObject);

			messageInput.value = "";
			return;
		}
	} catch (error) {
		throw new Error(error);
	}
};
