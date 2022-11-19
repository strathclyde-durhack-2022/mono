import GuessDropdown from './GuessDropdown'
import {MOCK_HIST} from './History'

const Guess = () => {
    return (
        <GuessDropdown ticker={MOCK_HIST} />
    )
}

export default Guess