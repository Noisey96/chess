import { Chess } from 'chess.js';
import { useRef, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import Title from './Title';
import Settings from './Settings';
import Options from './Options';
import { engines } from '../utilities/engines';

function App() {
	let [difficulty, setDifficulty] = useState('easy');
	let [playingAs, setPlayingAs] = useState('black');
	let [playing, setPlaying] = useState(false);
	let [game, setGame] = useState(new Chess());
	let [future, setFuture] = useState([]);
	let timeoutRef = useRef(null);

	// changes the changed setting
	function handleSettingsChange(event) {
		let setting = event.target.name;
		if (setting === 'difficulty') setDifficulty(event.target.id);
		else if (setting === 'playingAs') setPlayingAs(event.target.id);
	}

	// starts the game
	function handleStart() {
		setPlaying(true);

		// if player has black pieces, perform computer's turn
		if (playingAs === 'black') {
			const engine = engines[difficulty];
			const chosenMove = engine(game, playingAs);
			let nextGame = new Chess();
			nextGame.loadPgn(game.pgn());
			nextGame.move(chosenMove);
			setGame(nextGame);
		}
	}

	// performs the player's turn
	function handlePieceDrop(start, end) {
		// check for endgame scenarios
		const possibleMoves = game.moves();
		if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) {
			console.log(game.pgn());
			return false;
		}

		// perform move
		let nextGame = new Chess();
		nextGame.loadPgn(game.pgn());
		const move = nextGame.move({
			from: start,
			to: end,
		});

		// move failed
		if (move === null) return false;

		// move succeeded
		setGame(nextGame);
		setFuture([]);
		const newTimeout = setTimeout(computerTurn, 2500);
		timeoutRef.current = newTimeout;
		return true;
	}

	// performs the computer's turn
	function computerTurn() {
		setGame((game) => {
			// check for endgame scenarios
			const possibleMoves = game.moves();
			if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) {
				console.log(game.pgn());
				return;
			}

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
			<div>
				{!playing ? (
					<Settings
						difficulty={difficulty}
						playingAs={playingAs}
						onSettingsChange={handleSettingsChange}
						onStart={handleStart}
					/>
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
