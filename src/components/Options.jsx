import { Chess } from 'chess.js';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { engines } from '../utilities/engines';
import './Options.css';

export default function Options(props) {
	let { setHistory, difficulty, playingAs, currentTimeout, setCurrentTimeout, onNewGame } = props;

	// restart game
	function restartGame() {
		// goes back to the beginning
		clearTimeout(currentTimeout);
		let game = new Chess(),
			newHistory = [game.fen()];

		// if player has black pieces, perform computer's turn
		if (playingAs === 'black') {
			const newTimeout = setTimeout(() => {
				let engine = engines[difficulty];
				let chosenMove = engine(game, playingAs);
				game.move(chosenMove);
				newHistory = [...newHistory, game.fen()];
				setHistory(newHistory);
			}, 250);
			setCurrentTimeout(newTimeout);
		} else {
			setHistory(newHistory);
		}
	}

	function handleNewGameClick() {
		onNewGame();
	}

	return (
		<Stack id="options" direction="horizontal" gap="3">
			<Button variant="secondary" disabled={true}>
				Undo
			</Button>
			<Button variant="secondary" disabled={true}>
				Redo
			</Button>
			<Button variant="warning" onClick={restartGame}>
				Restart
			</Button>
			<Button variant="danger" onClick={handleNewGameClick}>
				New Game
			</Button>
		</Stack>
	);
}
