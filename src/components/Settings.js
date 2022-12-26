// external imports
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

// internal imports
import { engines } from '../utilities/engines';
import { updateState } from '../utilities/functions';
import './Settings.css';

export default function Settings(props) {
	let {
		difficulty,
		setDifficulty,
		playAs,
		setPlayAs,
		game,
		setGame,
		setOpponent,
		setBoardOrientation,
	} = props;

	// handle change to the difficulty form group
	function onDifficultyChange(event) {
		setDifficulty(event.target.id);
	}

	// handle change to the playAs form group
	function onPlayAsChange(event) {
		setPlayAs(event.target.id);
	}

	// begin game
	function startGame() {
		// transfer settings to the game
		let opponent = difficulty;
		setOpponent(opponent);

		let boardOrientation = playAs;
		if (boardOrientation === 'random')
			boardOrientation = Math.random() < 0.5 ? 'black' : 'white';
		setBoardOrientation(boardOrientation);

		// if player has black pieces, perform computer's turn
		if (boardOrientation === 'black') {
			setTimeout(() => {
				let engine = engines[opponent];
				let chosenMove = engine(game, boardOrientation);
				updateState(setGame, (game) => {
					game.move(chosenMove);
				});
			}, 500);
		}
	}

	return (
		<Stack id="settings" direction="horizontal" gap="5">
			<Form.Group controlId="difficulty">
				<Form.Label>Difficulty:</Form.Label>
				<Form.Check
					row
					type="radio"
					name="difficulty"
					id="easy"
					label="Easy"
					checked={difficulty === 'easy'}
					onChange={onDifficultyChange}
				/>
				<Form.Check
					type="radio"
					name="difficulty"
					id="medium"
					label="Medium"
					checked={difficulty === 'medium'}
					onChange={onDifficultyChange}
				/>
				<Form.Check
					type="radio"
					name="difficulty"
					id="hard"
					label="Hard"
					checked={difficulty === 'hard'}
					onChange={onDifficultyChange}
				/>
			</Form.Group>
			<Form.Group controlId="playAs">
				<Form.Label>Play As:</Form.Label>
				<Form.Check
					type="radio"
					name="play-as"
					id="black"
					label="Black"
					checked={playAs === 'black'}
					onChange={onPlayAsChange}
				/>
				<Form.Check
					type="radio"
					name="play-as"
					id="white"
					label="White"
					checked={playAs === 'white'}
					onChange={onPlayAsChange}
				/>
				<Form.Check
					type="radio"
					name="play-as"
					id="random"
					label="Random"
					checked={playAs === 'random'}
					onChange={onPlayAsChange}
				/>
			</Form.Group>
			<Button size="lg" onClick={startGame}>
				Start Game
			</Button>
		</Stack>
	);
}
