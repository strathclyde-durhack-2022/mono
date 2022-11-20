 import * as express from "express"
const Score = require("./models/Score") // new
const router = express.Router()

// Get all posts
router.get("/:numberOfItem", async (req:any, res:any) => {
	// req.params.numberOfItem
	const scores = await Score.find().sort({ score : -1}).limit(req.params.numberOfItem)
	res.send(scores)
})

router.post("/", async (req:any, res:any) => { 
	await Score.findOneAndUpdate({username: req.body.username}, { $inc: { totalGuess: 1 , score: req.body.correct }}, {upsert: true} ); 
	res.send("success")
})

module.exports = router