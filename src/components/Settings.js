import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Settings(props) {
	let { difficulty, setDifficulty, playAs, setPlayAs, startGame } = props;

	function onDifficultyChange(event) {
		setDifficulty(event.target.id);
	}

	function onPlayAsChange(event) {
		setPlayAs(event.target.id);
	}

	return (
		<>
			Difficulty:
			<Form.Check
				type="radio"
				name="difficulty"
				id="easy"
				label="Easy"
				checked={difficulty === 'easy'}
				onChange={onDifficultyChange}
				inline
			/>
			<Form.Check
				type="radio"
				name="difficulty"
				id="medium"
				label="Medium"
				checked={difficulty === 'medium'}
				onChange={onDifficultyChange}
				inline
			/>
			<Form.Check
				type="radio"
				name="difficulty"
				id="hard"
				label="Hard"
				checked={difficulty === 'hard'}
				onChange={onDifficultyChange}
				inline
			/>
			Play as:
			<Form.Check
				type="radio"
				name="play-as"
				id="black"
				label="Black"
				checked={playAs === 'black'}
				onChange={onPlayAsChange}
				inline
			/>
			<Form.Check
				type="radio"
				name="play-as"
				id="white"
				label="White"
				checked={playAs === 'white'}
				onChange={onPlayAsChange}
				inline
			/>
			<Form.Check
				type="radio"
				name="play-as"
				id="random"
				label="Random"
				checked={playAs === 'random'}
				onChange={onPlayAsChange}
				inline
			/>
			<Button onClick={startGame}>Start Game</Button>
		</>
	);
}
