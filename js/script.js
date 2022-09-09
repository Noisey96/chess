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

	window.setTimeout(algo(game, board), 250);
}

function onSnapEnd() {
	board.position(game.fen());
}

function flipHidden() {
	let startSettings = document.body.querySelector('#settings-start');
	let status = document.body.querySelector('#status');
	let playingSettings = document.body.querySelector('#settings-playing');
	startSettings.hidden = !startSettings.hidden;
	status.hidden = !status.hidden;
	playingSettings.hidden = !playingSettings.hidden;
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
	if (side === 'black') window.setTimeout(algo(game, board), 250);

	flipHidden();
}

function undoMove() {
	if (game.history().length > 1) {
		future.push(game.undo());
		future.push(game.undo());
	}
	board.position(game.fen());
}

function redoMove() {
	game.move(future.pop());
	game.move(future.pop());
	board.position(game.fen());
}

function restart() {
	future = [];
	game.reset();
	board = Chessboard('board', config);
	if (side === 'black') window.setTimeout(algo(game, board), 250);
}

function newGame() {
	future = [];
	game.reset();
	board = Chessboard('board', 'start');
	flipHidden();
}

let startGameButton = document.body.querySelector('#start-game');
let undoButton = document.body.querySelector('#undo');
let redoButton = document.body.querySelector('#redo');
let restartButton = document.body.querySelector('#restart');
let newGameButton = document.body.querySelector('#new-game');
undoButton.addEventListener('click', undoMove);
redoButton.addEventListener('click', redoMove);
startGameButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restart);
newGameButton.addEventListener('click', newGame);
