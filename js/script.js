import { preferRandomCapture } from './engines.js';

const game = new Chess();
const config = {
	draggable: true,
	position: 'start',
	onDragStart: onDragStart,
	onDrop: onDrop,
	onSnapEnd: onSnapEnd,
};
let board = Chessboard('board', config);

function onDragStart(_source, piece, _position, _orientation) {
	if (game.game_over()) return false;
	if (piece.search(/^b/) !== -1) return false;
}

function onDrop(source, target) {
	const move = game.move({
		from: source,
		to: target,
		promotion: 'q',
	});
	if (move === null) return 'snapback';

	window.setTimeout(preferRandomCapture(game, board), 250);
}

function onSnapEnd() {
	board.position(game.fen());
}
