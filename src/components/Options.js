// external imports
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

// internal imports
import { engines } from '../utilities/engines';
import { updateState } from '../utilities/functions';
import './Options.css';

export default function Options(props) {
	let {
		game,
		setGame,
		opponent,
		setOpponent,
		boardOrientation,
		setBoardOrientation,
		currentTimeout,
		setCurrentTimeout,
		future,
		setFuture,
	} = props;

	// undo player's last move
	function undoMove() {
		// on player's turn, undo two moves
		if (boardOrientation.substring(0, 1) === game.turn()) {
			updateState(setGame, (game) => {
				setFuture(future.concat(game.undo(), game.undo()));
			});
		}
		// on computer's turn, stop the computer and undo one move
		else {
			clearTimeout(currentTimeout);
			updateState(setGame, (game) => {
				setFuture(future.concat(game.undo()));
			});
		}
	}

	// redo player's last move
	function redoMove() {
		// with at least two moves in future, redo both moves
		if (future.length > 1) {
			updateState(setGame, (game) => {
				game.move(future.filter((_m, i) => i >= future.length - 2)[1]);
				game.move(future.filter((_m, i) => i >= future.length - 2)[0]);
				setFuture(future.filter((_m, i) => i < future.length - 2));
			});
		}
		// with only one move in future, redo one move and perform computer's turn
		else {
			updateState(setGame, (game) => {
				game.move(future[0]);
				setFuture([]);
			});
			const newTimeout = setTimeout(() => {
				let engine = engines[opponent];
				let chosenMove = engine(game, boardOrientation);
				updateState(setGame, (game) => {
					game.move(chosenMove);
				});
			}, 500);
			setCurrentTimeout(newTimeout);
		}
	}

	// restart game
	function restartGame() {
		// goes back to the beginning
		clearTimeout(currentTimeout);
		updateState(setGame, (game) => {
			game.reset();
		});
		setFuture([]);

		// if player has black pieces, perform computer's turn
		if (boardOrientation === 'black') {
			const newTimeout = setTimeout(() => {
				let engine = engines[opponent];
				let chosenMove = engine(game, boardOrientation);
				updateState(setGame, (game) => {
					game.move(chosenMove);
				});
			}, 500);
			setCurrentTimeout(newTimeout);
		}
	}

	// ends game
	function endGame() {
		// goes back to the beginning
		clearTimeout(currentTimeout);
		updateState(setGame, (game) => {
			game.reset();
		});
		setFuture([]);

		// resets settings
		setOpponent(null);
		setBoardOrientation('white');
	}

	return (
		<Stack id="options" direction="horizontal" gap="3">
			<Button variant="secondary" disabled={game.history().length < 2} onClick={undoMove}>
				Undo
			</Button>
			<Button variant="secondary" disabled={!future.length} onClick={redoMove}>
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
