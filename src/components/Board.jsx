import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { engines } from '../utilities/engines';

export default function Board(props) {
	let { history, setHistory, difficulty, playingAs, setCurrentTimeout } = props;

	// player's turn
	function onDrop(start, end) {
		let game = new Chess(history[history.length - 1]);

		// check for endgame scenarios
		const possibleMoves = game.moves();
		if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) {
			console.log(game.pgn());
			return false;
		}

		// perform move
		const move = game.move({
			from: start,
			to: end,
		});

		// move failed
		if (move === null) return false;

		// move succeeded
		setHistory([...history, game.fen()]);
		const newTimeout = setTimeout(computerTurn, 500);
		setCurrentTimeout(newTimeout);
		return true;
	}

	function computerTurn() {
		setHistory((history) => {
			let game = new Chess(history[history.length - 1]);

			// check for endgame scenarios
			const possibleMoves = game.moves();
			if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) {
				console.log(game.pgn());
				return;
			}

			// perform move
			let engine = engines[difficulty];
			let chosenMove = engine(game, playingAs);
			game.move(chosenMove);
			return [...history, game.fen()];
		});
	}

	return (
		<Chessboard
			boardWidth="600"
			customBoardStyle={{
				border: '2px solid black',
				borderRadius: '4px',
			}}
			arePiecesDraggable={difficulty}
			boardOrientation={playingAs}
			position={history[history.length - 1]}
			onPieceDrop={onDrop}
		/>
	);
}
