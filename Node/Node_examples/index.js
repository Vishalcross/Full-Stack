var rect = require("./rectangle");

function solveRectangle(x, y) {
	console.log(`Solving for rectangle with length = ${x} and breadth = ${y}`);
	if (x <= 0 || y <= 0) {
		console.log(
			"Rectangle dimensions should be a non-zero positive number"
		);
	} else {
		console.log(
			`Area is ${rect.area(x, y)} and Perimeter is ${rect.perimeter(
				x,
				y
			)}`
		);
	}
}

solveRectangle(1, 2);
solveRectangle(3, 5);
solveRectangle(0, 5);
solveRectangle(3, -2);
