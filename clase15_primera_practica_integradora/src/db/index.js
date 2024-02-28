const mongoose = require("mongoose");
const { dbUser, dbPassword, dbHost } = require("../configs/db.config");

const mongoConnect = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/ecommerce?retryWrites=true&w=majority&appName=ecommerce`
		);
		console.log("DB is connected");
	} catch (error) {
		console.log("MONGOCONNECT", error);
	}
};
module.exports = mongoConnect;
