const mongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = "mongodb://localhost:27017/";
const dbname = "confusion";
mongoClient.connect(url, (err, client) => {
	assert.equal(err, null);
	console.log("Connected to MongoDB");
	const db = client.db(dbname);
	const collection = db.collection("dishes");
	collection.insertOne(
		{
			name: "Test",
			description: "Test file",
		},
		(err, result) => {
			assert.equal(err, null);
			console.log("After insertion");
			console.log(result.ops);
			collection.find({}).toArray((err, docs) => {
				assert.equal(err, null);
				console.log("Found");
				console.log(docs);
			});
			db.dropCollection("dishes", (err, results) => {
				assert.equal(err, null);
				console.log("Deleted collection");
				client.close();
			});
		}
	);
});
