 

// import { Schema, model, connect } from 'mongoose';

// // 1. Create an interface representing a document in MongoDB.
// interface IUser {
//   name: string;
//   email: string;
//   avatar?: string;
// }

// interface IScore {
//   username: string; 
//   score: number;
// }

// require('dotenv').config()
// const uri = "mongodb+srv://dev:"+process.env.PASSWORD+"@cluster0.y71di.mongodb.net/?retryWrites=true&w=majority";
 
// console.log(uri);
// // 2. Create a Schema corresponding to the document interface.
// const userSchema = new Schema<IUser>({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   avatar: String
// });

// const scoreSchema = new Schema<IScore>({
//   username: { type: String, required: true },
//   score: { type: Number, required: true }, 
// });

// // 3. Create a Model.
// const User = model<IUser>('User', userSchema);
// const Score = model<IScore>('Score', scoreSchema);

// run().catch(err => console.log(err));

// async function run() {
//   // 4. Connect to MongoDB
//   await connect(uri);

//   const score = new Score({
//     username: 'Potato',
//     score: 13, 
//   }); 
//   await Score.findOneAndUpdate(
//     { username: score.username },
//     {username: score.username, score: score.score},
//     {
//       upsert: true 
//     }
//  )
//   console.log(score.username,score.score); // 'bill@initech.com'
// }

//---------------

const express = require("express")
const mongoose = require("mongoose") // new
const routes = require("./routes")
require('dotenv').config()
const uri = "mongodb+srv://dev:"+process.env.PASSWORD+"@cluster0.y71di.mongodb.net/?retryWrites=true&w=majority";
// Connect to MongoDB database
 


 
mongoose
	.connect(uri, { useNewUrlParser: true })
	.then(() => {
		const app = express()
		app.use(express.json()) // new
		app.use("/", routes)

		app.listen(5000, () => {
			console.log("Server has started!")
		})
	})