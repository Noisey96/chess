import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { engines } from '../utilities/engines';

export default function Board(props) {
	let { game, setGame, opponent, boardOrientation, setCurrentTimeout } = props;

	// player's turn
	function onDrop(start, end) {
		// check for endgame scenarios
		const possibleMoves = game.moves();
		if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) {
			console.log(game.pgn());
			return false;
		}

		// perform move
		let nextGame = new Chess(game.fen());
		const move = nextGame.move({
			from: start,
			to: end,
		});
		setGame(nextGame);

		// move failed
		if (move === null) return false;

		// move succeeded
		const newTimeout = setTimeout(computerTurn, 500);
		setCurrentTimeout(newTimeout);
		return true;
	}

	function computerTurn() {
		setGame((game) => {
			// check for endgame scenarios
			const possibleMoves = game.moves();
			if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) {
				console.log(game.pgn());
				return;
			}

			// perform move
			let engine = engines[opponent];
			let chosenMove = engine(game, boardOrientation);
			let nextGame = new Chess(game.fen());
			nextGame.move(chosenMove);
			return nextGame;
		});
	}

	return (
		<Chessboard
			boardWidth="600"
			customBoardStyle={{
				border: '2px solid black',
				borderRadius: '4px',
			}}
			arePiecesDraggable={opponent}
			boardOrientation={boardOrientation}
			position={game.fen()}
			onPieceDrop={onDrop}
		/>
	);
}
