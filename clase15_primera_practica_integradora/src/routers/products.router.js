const { Router } = require("express");
const {
	controllerGetProducts,
	controllerGetProductById,
	controllerAddProduct,
	controllerUpdateProduct,
	controllerDeleteProduct,
} = require("../controllers/products.controller.js");

const router = Router();

router.get("/", controllerGetProducts);
router.get("/:pid", controllerGetProductById);
router.post("/", controllerAddProduct);
router.put("/:pid", controllerUpdateProduct);
router.delete("/:pid", controllerDeleteProduct);

module.exports = router;
