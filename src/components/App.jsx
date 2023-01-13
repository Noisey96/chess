import { Chess } from 'chess.js';
import { useRef, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import Title from './Title';
import Settings from './Settings';
import Options from './Options';
import { engines } from '../utilities/engines';
import { ended, isPromotion } from '../utilities/functions';

function App() {
	let [difficulty, setDifficulty] = useState('easy');
	let [playingAs, setPlayingAs] = useState('black');
	let [playing, setPlaying] = useState(false);
	let [game, setGame] = useState(new Chess());
	let [future, setFuture] = useState([]);
	let timeoutRef = useRef(null);

	// starts the game
	function handleStart(settings) {
		// update the game with selected settings
		const selectedDifficulty = settings.difficulty;
		const selectedPlayingAs = settings.playingAs;
		setDifficulty(selectedDifficulty);
		setPlayingAs(selectedPlayingAs);
		setPlaying(true);

		// if player has black pieces, perform computer's turn
		if (selectedPlayingAs === 'black') {
			const engine = engines[selectedDifficulty];
			const chosenMove = engine(game, selectedPlayingAs);
			let nextGame = new Chess();
			nextGame.loadPgn(game.pgn());
			nextGame.move(chosenMove);
			setGame(nextGame);
		}
	}

	// performs the player's turn
	function handlePieceDrop(start, end) {
		// check for endgame scenarios
		if (ended(game)) return false;

		// perform move
		let nextGame = new Chess();
		nextGame.loadPgn(game.pgn());
		let move;
		if (isPromotion(game, start, end)) {
			move = nextGame.move({
				from: start,
				to: end,
				promotion: 'q',
			});
		} else {
			move = nextGame.move({
				from: start,
				to: end,
			});
		}

		// if valid, go to computer's turn
		if (move === null) return false;
		else {
			setGame(nextGame);
			setFuture([]);
			const newTimeout = setTimeout(computerTurn, 500);
			timeoutRef.current = newTimeout;
			return true;
		}
	}

	// performs the computer's turn
	function computerTurn() {
		setGame((game) => {
			// check for endgame scenarios
			if (ended(game)) return game;

			// perform move
			let engine = engines[difficulty];
			let chosenMove = engine(game, playingAs);
			let nextGame = new Chess();
			nextGame.loadPgn(game.pgn());
			nextGame.move(chosenMove);
			return nextGame;
		});
	}

	// undos the player's last move
	function handleUndo() {
		clearTimeout(timeoutRef.current);
		let nextGame = new Chess();
		nextGame.loadPgn(game.pgn());
		let lastMove = nextGame.undo();
		setFuture([lastMove, ...future]);
		if (playingAs.substring(0, 1) !== nextGame.turn()) {
			lastMove = nextGame.undo();
			setFuture((future) => [lastMove, ...future]);
		}
		setGame(nextGame);
	}

	// redos the player's last move
	function handleRedo() {
		let nextGame = new Chess();
		nextGame.loadPgn(game.pgn());

		// with at least two moves in future, redo both moves
		if (future.length > 1) {
			nextGame.move(future[0]);
			nextGame.move(future[1]);
			setFuture([...future.slice(2)]);
		}
		// with only one move in future, redo one move and perform computer'sturn
		else {
			nextGame.move(future[0]);
			setFuture([]);

			let engine = engines[difficulty];
			let chosenMove = engine(nextGame, playingAs);
			nextGame.move(chosenMove);
		}
		setGame(nextGame);
	}

	// restarts the game
	function handleRestart() {
		// goes back to the beginning
		clearTimeout(timeoutRef.current);
		let nextGame = new Chess();
		nextGame.loadPgn(game.pgn());
		nextGame.reset();

		// if player has black pieces, perform computer's turn
		if (playingAs === 'black') {
			let engine = engines[difficulty];
			let chosenMove = engine(nextGame, playingAs);
			nextGame.move(chosenMove);
		}
		setGame(nextGame);
		setFuture([]);
	}

	// ends the game
	function handleNewGame() {
		clearTimeout(timeoutRef.current);
		let nextGame = new Chess();
		nextGame.loadPgn(game.pgn());
		nextGame.reset();
		setGame(nextGame);
		setFuture([]);
		setPlaying(false);
	}

	return (
		<>
			<div className="flex flex-col items-center">
				<Title playing={playing} />
				<Chessboard
					boardWidth="600"
					customBoardStyle={{
						border: '2px solid black',
						borderRadius: '4px',
					}}
					arePiecesDraggable={playing}
					boardOrientation={!playing ? 'white' : playingAs}
					position={game.fen()}
					onPieceDrop={handlePieceDrop}
				/>
			</div>
			<div className="flex justify-center">
				{!playing ? (
					<Settings onStart={handleStart} />
				) : (
					<Options
						history={game.history()}
						future={future}
						onUndo={handleUndo}
						onRedo={handleRedo}
						onRestart={handleRestart}
						onNewGame={handleNewGame}
					/>
				)}
			</div>
		</>
	);
}

export default App;
