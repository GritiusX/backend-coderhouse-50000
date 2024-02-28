const { Router } = require("express");
const messageModel = require("../dao/models/messages.model.js");
const {
	controllerGetMessages,
	controllerGetMessagesById,
	controllerAddMessage,
	controllerUpdateMessage,
	controllerDeleteMessage,
} = require("../controllers/messages.controller.js");

const router = Router();

router.get("/", controllerGetMessages);
router.post("/", controllerAddMessage);
/* router.get("/:mid", controllerGetMessagesById);
router.put("/:mid", controllerUpdateMessage);
router.delete("/:mid", controllerDeleteMessage); */

module.exports = router;
