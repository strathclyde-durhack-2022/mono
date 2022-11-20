import GuessDropdown from "./GuessDropdown";
import { ICoin } from "./Interface";
const Guess = (props: {
  coins: ICoin[];
  onChange: (selected: string) => void;
}) => {
  return <GuessDropdown ticker={props.coins} onChange={props.onChange} />;
};

export default Guess;
