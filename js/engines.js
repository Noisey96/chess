export function makeRandomMove(game, board) {
	if (game.game_over()) return;

	const possibleMoves = game.moves();
	const randomIdx = Math.floor(Math.random() * possibleMoves.length);

	game.move(possibleMoves[randomIdx]);
	board.position(game.fen());
}

export function preferRandomCapture(game, board) {
	if (game.game_over()) {
		console.log(game.pgn());
		return;
	}

	const possibleMoves = game.moves();
	const possibleCaptures = possibleMoves.filter((m) => m.includes('x'));

	let randomIdx;
	if (possibleCaptures.length) {
		randomIdx = Math.floor(Math.random() * possibleCaptures.length);
		game.move(possibleCaptures[randomIdx]);
	} else {
		randomIdx = Math.floor(Math.random() * possibleMoves.length);
		game.move(possibleMoves[randomIdx]);
		board.position(game.fen());
	}

	board.position(game.fen());
}
