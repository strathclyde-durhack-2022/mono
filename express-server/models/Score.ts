 
import * as mongoose from "mongoose"
interface IScore {
  username: string; 
  score: number;
}
const scoreSchema = new mongoose.Schema<IScore>({
  username: { type: String, required: true },
  score: { type: Number, required: true }, 
});

module.exports = mongoose.model("Score", scoreSchema)