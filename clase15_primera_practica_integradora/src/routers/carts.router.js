const { Router } = require("express");
const {
	controllerAddCart,
	controllerGetCartById,
	controllerAddProductToCartById,
} = require("../controllers/carts.controller.js");

const router = Router();

router.get("/:cid", controllerGetCartById);
router.post("/", controllerAddCart);
router.post("/:cid/product/:pid", controllerAddProductToCartById);

module.exports = router;
