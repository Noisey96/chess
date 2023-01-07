import { Chess } from 'chess.js';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { engines } from '../utilities/engines';
import './Options.css';

export default function Options(props) {
	let {
		setGame,
		opponent,
		setOpponent,
		boardOrientation,
		setBoardOrientation,
		currentTimeout,
		setCurrentTimeout,
	} = props;

	// restart game
	function restartGame() {
		// goes back to the beginning
		clearTimeout(currentTimeout);
		let nextGame = new Chess();
		setGame(nextGame);

		// if player has black pieces, perform computer's turn
		if (boardOrientation === 'black') {
			const newTimeout = setTimeout(
				setGame((game) => {
					let engine = engines[opponent];
					let chosenMove = engine(game, boardOrientation);
					let nextGame = new Chess(game.fen());
					nextGame.move(chosenMove);
					setGame(nextGame);
				}),
				500
			);
			setCurrentTimeout(newTimeout);
		}
	}

	// ends game
	function endGame() {
		// goes back to the beginning
		clearTimeout(currentTimeout);
		let nextGame = new Chess();
		setGame(nextGame);

		// resets settings
		setOpponent(null);
		setBoardOrientation('white');
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
			<Button variant="danger" onClick={endGame}>
				New Game
			</Button>
		</Stack>
	);
}
