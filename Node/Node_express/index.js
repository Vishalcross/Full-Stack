const http = require("http");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const hostname = "localhost";
const dishRouter = require("./routes/dishRouter");
const port = 3000;

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/dishes", dishRouter);
app.get("/dishes/:dishId", (req, res, next) => {
	res.end("Will send this dish" + req.params.dishId + " back!");
});

app.post("/dishes/:dishId", (req, res, next) => {
	res.statusCode = 403;
	res.end(`POST operation not supported on /dishes/${req.params.dishId}`);
});

app.put("/dishes/:dishId", (req, res, next) => {
	res.write(`Updating the dish ${req.params.dishId}\n`);
	res.end(
		`Will update the dish ${req.body.name} and ${req.body.description}`
	);
});

app.delete("/dishes/:dishId", (req, res, next) => {
	res.end(`Deleting the dish ${req.params.dishId}`);
});

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/html");
	res.end("<html>Express server</html>");
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
	console.log("Server running");
});
