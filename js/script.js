import { makeRandomMove, preferRandomCapture, lazyMiniMax } from './engines.js';

let algo, side, config;
let future = [];
const algoForDiff = {
	easy: makeRandomMove,
	medium: preferRandomCapture,
	hard: lazyMiniMax,
};

const game = new Chess();
let board = Chessboard('board', 'start');

function onDragStart(_source, piece, _position, _orientation) {
	if (game.game_over()) return false;
	if (
		(side === 'white' && piece.search(/^b/) !== -1) ||
		(side === 'black' && piece.search(/^w/) !== -1)
	)
		return false;
}

function onDrop(source, target) {
	const move = game.move({
		from: source,
		to: target,
		promotion: 'q',
	});
	if (move === null) return 'snapback';

	future = [];
	updateStatus();

	algo(game, board);
	updateStatus();
	checkButtons();
}

function onSnapEnd() {
	board.position(game.fen());
}

function flipDisplay(curState) {
	let startSettings = document.body.querySelector('#settings-start');
	let status = document.body.querySelector('#status');
	let playingSettings = document.body.querySelector('#settings-playing');
	if (curState === 'config') {
		startSettings.style.display = 'none';
		status.style.display = 'flex';
		playingSettings.style.display = 'flex';
	} else if (curState === 'playing') {
		startSettings.style.display = 'flex';
		status.style.display = 'none';
		playingSettings.style.display = 'none';
	}
}

function checkButtons() {
	const undoButton = document.body.querySelector('#undo');
	const redoButton = document.body.querySelector('#redo');
	undoButton.disabled = game.history().length < 2;
	redoButton.disabled = !future.length;
}

function updateStatus() {
	const statusArea = document.body.querySelector('#status');
	let status, who;

	if ((side === 'black' && game.turn() === 'b') || (side === 'white' && game.turn() === 'w'))
		who = 'you';
	else who = 'computer';

	if (game.in_checkmate() && who === 'you') status = 'You lose! The computer has checkmate.';
	else if (game.in_checkmate()) status = 'You win! You have checkmate.';
	else if (game.in_draw()) status = 'You draw!';
	else if (game.in_check() && who === 'you') status = 'Your turn. The computer has check!';
	else if (game.in_check()) status = "The computer's turn. You have check!";
	else if (who === 'you') status = 'Your turn.';
	else status = "The computer's turn.";
	statusArea.textContent = status;
}

function startGame() {
	const difficulty = document.body.querySelector('input[name="difficulty"]:checked').value;
	algo = algoForDiff[difficulty];

	side = document.body.querySelector('input[name="side"]:checked').value;
	if (side === 'random' && Math.random() < 0.5) side = 'black';
	else if (side === 'random') side = 'white';

	config = {
		draggable: true,
		position: 'start',
		orientation: side,
		onDragStart: onDragStart,
		onDrop: onDrop,
		onSnapEnd: onSnapEnd,
	};
	board = Chessboard('board', config);
	if (side === 'black') algo(game, board);
	checkButtons();
	updateStatus();
	flipDisplay('config');
}

function undoMove() {
	if ((side === 'black' && game.turn() === 'b') || (side === 'white' && game.turn() === 'w'))
		future.push(game.undo());
	future.push(game.undo());
	checkButtons();
	updateStatus();
	board.position(game.fen());
}

function redoMove() {
	game.move(future.pop());
	game.move(future.pop());
	checkButtons();
	updateStatus();
	board.position(game.fen());
}

function restart() {
	future = [];
	game.reset();
	board = Chessboard('board', config);
	if (side === 'black') algo(game, board);
	checkButtons();
	updateStatus();
}

function newGame() {
	future = [];
	game.reset();
	board = Chessboard('board', 'start');
	flipDisplay('playing');
}

const startGameButton = document.body.querySelector('#start-game');
const undoButton = document.body.querySelector('#undo');
const redoButton = document.body.querySelector('#redo');
const restartButton = document.body.querySelector('#restart');
const newGameButton = document.body.querySelector('#new-game');
undoButton.addEventListener('click', undoMove);
redoButton.addEventListener('click', redoMove);
startGameButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restart);
newGameButton.addEventListener('click', newGame);
