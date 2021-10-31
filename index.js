require("dotenv").config();
const sequelize = require("./model/db");

async function run() {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}

run();
