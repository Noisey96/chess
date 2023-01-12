export function ended(game) {
	const possibleMoves = game.moves();
	if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) {
		console.log(game.pgn());
		return true;
	}
	return false;
}

export function isPromotion(game, from, to) {
	return (
		(game.get(from).type === 'p' && game.turn() === 'b' && to[1] === '1') ||
		(game.get(from).type === 'p' && game.turn() === 'w' && to[1] === '8')
	);
}
