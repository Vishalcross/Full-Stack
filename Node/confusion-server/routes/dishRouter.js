const express = require("express");
const bodyParser = require("body-parser");
const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter
	.route("/")
	.all((req, res, next) => {
		res.statusCode = 200;
		res.setHeader("Content-Type", "text/plain");
		next();
	})
	.get((req, res, next) => {
		res.end("Will send all the dishes back!");
	})
	.post((req, res, next) => {
		res.end(`Adding ${req.body.name} and ${req.body.description}`);
	})
	.put((req, res, next) => {
		res.statusCode = 403;
		res.end(`PUT operation not supported`);
	})

	.delete((req, res, next) => {
		res.end(`Deleting all the dishes`);
	});

dishRouter
	.route("/:dishId")
	.all((req, res, next) => {
		res.statusCode = 200;
		res.setHeader("Content-Type", "text/plain");
		next();
	})
	.get((req, res, next) => {
		res.end("Will send this dish" + req.params.dishId + " back!");
	})
	.post((req, res, next) => {
		res.end(`POST operation not supported on /dishes/${req.params.dishId}`);
	})
	.put((req, res, next) => {
		res.statusCode = 403;
		res.end(
			`Will update the dish ${req.body.name} and ${req.body.description}`
		);
	})

	.delete((req, res, next) => {
		res.end(`Deleting the dish ${req.params.dishId}`);
	});
module.exports = dishRouter;
