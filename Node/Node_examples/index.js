var rect = require("./rectangle");
var rect = require("./rectangle");

function solveRectangle(x, y) {
	console.log(`Solving for rectangle with length = ${x} and breadth = ${y}`);
	rect(x, y, (err, rectangle) => {
		if (err) {
			console.log("Error: ", err.message);
		} else {
			console.log(
				"Area is " +
					rectangle.area() +
					" and perimieter is " +
					rectangle.perimeter()
			);
		}
	});
	console.log("This statement is after call to Rect");
}

solveRectangle(1, 2);
solveRectangle(3, 5);
solveRectangle(0, 5);
solveRectangle(3, -2);
