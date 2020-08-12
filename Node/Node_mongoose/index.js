const mongoose = require("mongoose");
const Dishes = require("./models/dishes");
const url = "mongodb://127.0.0.1:27017/confusion";
const connection = mongoose.connect(url);

connection.then((db) => {
	console.log("Connected to server");
	var newDish = Dishes({
		name: "Uthapizza",
		description: "Stupid dish",
	})
		.save()
		.then((dish) => {
			console.log(dish);
			return Dishes.findByIdAndUpdate(
				dish._id,
				{
					$set: { description: "Updated" },
				},
				{ new: true }
			).exec();
		})
		.then((dish) => {
			console.log(dish);
			dish.comments.push({
				rating: 5,
				comment: "Excellent dish",
				author: "Me",
			});
			return dish.save();
		})
		.then((dish) => {
			console.log(dish);
			return Dishes.deleteMany({});
		})
		.then(() => {
			return mongoose.connection.close();
		})
		.catch((err) => {
			console.log(err);
		});
});
