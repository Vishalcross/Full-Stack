const mongoose = require("mongoose");
const Dishes = require("./models/dishes");
const url = "mongodb://127.0.0.1:27017/confusion";
const connection = mongoose.connect(url);

connection.then((db) => {
	console.log("Connected to server");
	var newDish = Dishes({
		name: "Uthapizza",
		description: "Stupid dish",
	});
	newDish
		.save()
		.then((dish) => {
			console.log(dish);
			return Dishes.find({}).exec();
		})
		.then((dishes) => {
			console.log(dishes);
			return Dishes.remove({});
		})
		.then(() => {
			return mongoose.connection.close();
		})
		.catch((err) => {
			console.log(err);
		});
});
