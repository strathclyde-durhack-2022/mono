import GuessDropdown from "./GuessDropdown";
import { ICoin } from "./Interface";
const Guess = (props: {
  coins: ICoin[];
  onChange: (selected: string) => void;
  selected?: string;
}) => {
  return <GuessDropdown ticker={props.coins} onChange={props.onChange} selected={props.selected} />;
};

export default Guess;
