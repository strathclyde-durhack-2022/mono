 
import * as mongoose from "mongoose"
interface IScore {
  username: string; 
  score: number;
  totalGuess:number;
}
const scoreSchema = new mongoose.Schema<IScore>({
  username: { type: String, required: true },
  score: { type: Number, required: true }, 
  totalGuess: { type: Number, required: true }
});

module.exports = mongoose.model("Score", scoreSchema)