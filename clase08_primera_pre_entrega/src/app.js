const express = require("express");
const productsRouter = require("../routers/productsRouter.js");
const cartsRouter = require("../routers/cartsRouter.js");

const app = express();
app.use(express.json()); //con esto puede recibir json
app.use(express.urlencoded({ extended: true })); // con esto puede recibir parametros por url

app.get("/test", (req, res) => {
	res.json({ msg: "test successfully working" });
});

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const PORT = 8080;
app.listen(PORT, () => {
	console.log("listening on: ", PORT);
});
