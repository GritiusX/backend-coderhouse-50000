const { Router } = require("express");
const router = Router();

const products = [
	{ name: "producto default 1", price: 150 },
	{ name: "producto default 2", price: 250 },
	{ name: "producto default 3", price: 350 },
	{ name: "producto default 4", price: 450 },
	{ name: "producto default 5", price: 550 },
];

router.get("/", (req, res) => {
	res.render("home", { products, style: "style.css" }); // render(string,object) - si o si object
});

router.get("/realtimeproducts", (req, res) => {
	res.render("realTimeProducts", {
		style: "style.css",
	});
});

router.post("/submit", (req, res) => {
	const { name, price } = req.body;
	products.push({ name, price });
	res.redirect("/");
});

module.exports = router;
