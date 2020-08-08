const http = require("http");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const hostname = "localhost";
const dishRouter = require("./routes/dishRouter");
const leaderRouter = require("./routes/leaderRouter");
const promotionRouter = require("./routes/promotionRouter");
const port = 3000;

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/dishes", dishRouter);
app.use("/leaders", leaderRouter);
app.use("/promotions", promotionRouter);
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
