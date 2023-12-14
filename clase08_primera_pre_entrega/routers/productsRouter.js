const { Router } = require("express");
const {
	controllerGetProducts,
	controllerGetProductById,
	controllerAddProduct,
	controllerUpdateProduct,
} = require("../controllers/productsControllers.js");

const router = Router();

router.get("/", controllerGetProducts);
router.get("/:pid", controllerGetProductById);
router.post("/", controllerAddProduct);
router.put("/:pid", controllerUpdateProduct);

module.exports = router;
