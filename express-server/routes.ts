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
	const score = new Score({
		username: req.body.username,
		score: req.body.score,
	})
	await score.save()
	res.send(score)
})

module.exports = router