const express = require("express");
const handlebars = require("express-handlebars");
const mongoConnect = require("./db/index.js");
const { createServer } = require("node:http");
const setupSocket = require("./configs/socket.config.js");

const productsRouter = require("./routers/products.router.js");
const cartsRouter = require("./routers/carts.router.js");
const usersRouter = require("./routers/users.router.js");
const messagesRouter = require("./routers/messages.router.js");

const app = express();
const httpServer = createServer(app);
app.use(express.json()); //con esto puede recibir json (transforma el json del req.body a un objeto javascript)
app.use(express.urlencoded({ extended: true })); // con esto puede recibir parametros por url

// HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

// ROUTERS + ROUTES
app.get("/test", (req, res) => {
	res.json({ msg: "test successfully working" });
});
app.get("/", (req, res) => {
	res.render("chat", { style: "style.css" });
});
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", usersRouter);
app.use("/api/messages", messagesRouter);

// MONGOOSE + MONGO DB
mongoConnect();

// Socket.io
setupSocket(httpServer);

const PORT = 8080;

httpServer.listen(PORT, () => {
	console.log("listening on: ", PORT);
});
