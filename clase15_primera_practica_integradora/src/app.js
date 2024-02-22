const express = require("express");
const handlebars = require("express-handlebars");
const productsRouter = require("./routers/productsRouter.js");
const cartsRouter = require("./routers/cartsRouter.js");
const usersRouter = require("./routers/usersRouter.js");
const mongoose = require("mongoose");

const app = express();
//mongoose + mongoDb connection
mongoose.connect(
	"mongodb+srv://guidopawluk:guidito11@ecommerce.va9baxu.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce"
);

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

app.use(express.json()); //con esto puede recibir json
app.use(express.urlencoded({ extended: true })); // con esto puede recibir parametros por url

// routers + routes
app.get("/test", (req, res) => {
	res.json({ msg: "test successfully working" });
});
app.get("/", (req, res) => {
	res.render("index");
});

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", usersRouter);

const PORT = 8080;
app.listen(PORT, () => {
	console.log("listening on: ", PORT);
});
