const express = require("express");
const bodyParser = require("body-parser");
const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter
	.route("/")
	.all((req, res, next) => {
		res.statusCode = 200;
		res.setHeader("Content-Type", "text/plain");
		next();
	})
	.get((req, res, next) => {
		res.end("Will send all the leaders back!");
	})
	.post((req, res, next) => {
		res.end(`Adding ${req.body.name} and ${req.body.description}`);
	})
	.put((req, res, next) => {
		res.statusCode = 403;
		res.end(`PUT operation not supported`);
	})

	.delete((req, res, next) => {
		res.end(`Deleting all the leaders`);
	});

leaderRouter
	.route("/:leaderId")
	.all((req, res, next) => {
		res.statusCode = 200;
		res.setHeader("Content-Type", "text/plain");
		next();
	})
	.get((req, res, next) => {
		res.end("Will send this leader" + req.params.leaderId + " back!");
	})
	.post((req, res, next) => {
		res.end(
			`POST operation not supported on /leaders/${req.params.leaderId}`
		);
	})
	.put((req, res, next) => {
		res.statusCode = 403;
		res.end(
			`Will update the leader ${req.body.name} and ${req.body.description}`
		);
	})

	.delete((req, res, next) => {
		res.end(`Deleting the leader ${req.params.leaderId}`);
	});
module.exports = leaderRouter;
