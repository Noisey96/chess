import { Chess } from 'chess.js';
import { useRef, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import Title from './Title';
import Settings from './Settings';
import Options from './Options';
import { engines } from '../utilities/engines';
import { ended, isPromotion } from '../utilities/functions';

function App() {
	let [theme, setTheme] = useState('winter');
	let [difficulty, setDifficulty] = useState('easy');
	let [playingAs, setPlayingAs] = useState('black');
	let [playing, setPlaying] = useState(false);
	let [game, setGame] = useState(new Chess());
	let [future, setFuture] = useState([]);
	let timeoutRef = useRef(null);

	function toggleTheme() {
		let newTheme = theme === 'winter' ? 'night' : 'winter';
		document.querySelector('html').setAttribute('data-theme', newTheme);
		setTheme(newTheme);
	}

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
				<Title />
				<label className="swap-rotate swap">
					<input onClick={toggleTheme} type="checkbox" />
					<svg
						className="swap-on h-10 w-10 fill-current"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
					>
						<path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
					</svg>
					<svg
						className="swap-off h-10 w-10 fill-current"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
					>
						<path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
					</svg>
				</label>
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
