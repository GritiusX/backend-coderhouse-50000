const express = require("express");
const handlebars = require("express-handlebars");
const viewsRouter = require("./routes/viewsRouter");
const { Server } = require("socket.io");
const { port } = require("./configs/server.config");

const app = express();

app.use(express.json());

const httpServer = app.listen(port, () => {
	console.log("Server running on port " + port);
});

app.use(express.static(__dirname + "/public"));
app.use("/", viewsRouter);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const io = new Server(httpServer);

io.on("connection", (socket) => {
	console.log("Nuevo cliente conectado", socket.id);

	socket.on("message", (data) => {
		console.log(data);
	});
	socket.emit("messageServer", "HOLA DESDE EL SERVER");
	socket.broadcast.emit("messageOthers", "Hola a todos menos al principal");
});
