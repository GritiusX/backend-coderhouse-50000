const { Router } = require("express");
const userModel = require("../models/user.model.js");

const router = Router();

router.get("/", async (req, res) => {
	try {
		let users = await userModel.find();

		return res.send({ result: "success", payload: users });
	} catch (error) {
		console.error("userRouter Get", error);
	}
});

router.post("/", async (req, res) => {
	try {
		let { first_name, last_name, email } = req.body;
		if (!first_name || !last_name || !email)
			return res.send({ result: "error", payload: "Incomplete values" });
		let result = await userModel.create({
			first_name,
			last_name,
			email,
		});

		return res.send({ result: "success", payload: result });
	} catch (error) {
		console.error("userRouter Get", error);
	}
});

router.put("/:uid", async (req, res) => {
	try {
		let { uid } = req.params;
		let userToReplace = req.body;

		if (
			!userToReplace.first_name ||
			!userToReplace.last_name ||
			!userToReplace.email
		)
			return res.send({ result: "error", payload: "Incomplete values" });
		let result = await userModel.updateOne({ _id: uid }, userToReplace);

		return res.send({ result: "success", payload: result });
	} catch (error) {
		console.error("userRouter Get", error);
	}
});
router.delete("/:uid", async (req, res) => {
	try {
		let { uid } = req.params;

		let result = await userModel.deleteOne({ _id: uid });

		return res.send({ result: "success", payload: result });
	} catch (error) {
		console.error("userRouter Get", error);
	}
});

module.exports = router;
