const express = require("express"); //si usas "type": "module" ===> import express from "express";
const handlebars = require("express-handlebars");
const viewsRouter = require("./routes/viewsRouter");
const { Server } = require("socket.io");
const { port } = require("./configs/server.config");
const bodyParser = require("body-parser");

// Express
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const httpServer = app.listen(port, () => {
	console.log("Server running on port " + port);
});

// Handlebars
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/", viewsRouter);

// Socket.io
const io = new Server(httpServer);

io.on("connection", (socket) => {
	console.log("Nuevo cliente conectado", socket.id);

	// realTimeProducts
	let products = [];
	socket.on("product", (data) => {
		products.push(data);
		io.emit("sendingProducts", products);
	});
});
