import { Chess } from 'chess.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { engines } from '../utilities/engines';
import './Settings.css';

export default function Settings(props) {
	let { game, setGame, setPlaying, difficulty, setDifficulty, playingAs, setPlayingAs } = props;

	// handle change to the difficulty form group
	function onDifficultyChange(event) {
		setDifficulty(event.target.id);
	}

	// handle change to the playAs form group
	function onPlayingAsChange(event) {
		let choice = event.target.id;
		if (choice === 'random') choice = Math.random() < 0.5 ? 'black' : 'white';
		setPlayingAs(choice);
	}

	// begin game
	function startGame() {
		setPlaying(true);

		// if player has black pieces, perform computer's turn
		if (playingAs === 'black') {
			setTimeout(() => {
				let engine = engines[difficulty];
				let chosenMove = engine(game, playingAs);
				let nextGame = new Chess(game.fen());
				nextGame.move(chosenMove);
				setGame(nextGame);
			}, 500);
		}
	}

	return (
		<Stack id="settings" direction="horizontal" gap="5">
			<Form.Group controlId="difficulty">
				<Form.Label>Difficulty:</Form.Label>
				<Form.Check
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
					checked={playingAs === 'black'}
					onChange={onPlayingAsChange}
				/>
				<Form.Check
					type="radio"
					name="play-as"
					id="white"
					label="White"
					checked={playingAs === 'white'}
					onChange={onPlayingAsChange}
				/>
				<Form.Check
					type="radio"
					name="play-as"
					id="random"
					label="Random"
					checked={playingAs === 'random'}
					onChange={onPlayingAsChange}
				/>
			</Form.Group>
			<Button size="lg" onClick={startGame}>
				Start Game
			</Button>
		</Stack>
	);
}
