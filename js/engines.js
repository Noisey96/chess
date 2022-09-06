export function makeRandomMove(game, board) {
	if (game.game_over()) {
		console.log(game.pgn());
		return;
	}

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
	}

	board.position(game.fen());
}

const values = {
	k: -10000,
	q: -8,
	r: -5,
	b: -3,
	n: -3,
	p: -1,
	P: 1,
	N: 3,
	B: 3,
	R: 5,
	Q: 8,
	K: 10000,
};

function subtractPieces(fen, player) {
	const positions = fen.split(' ')[0].split('');
	const valueForWhite = positions.reduce((t, v) => {
		const value = values[v] ?? 0;
		return t + value;
	}, 0);
	return player === 'white' ? valueForWhite : -valueForWhite;
}

export function lazyMiniMax(game, board) {
	if (game.game_over()) {
		console.log(game.pgn());
		return;
	}

	const possibleMoves = game.moves();
	let max = Number.NEGATIVE_INFINITY,
		maxIdxs;
	for (let i = 0; i < possibleMoves.length; i++) {
		const m = possibleMoves[i];
		game.move(m);
		const possibleFen = game.fen();
		game.undo();
		const curValue = subtractPieces(possibleFen, 'black');
		if (curValue > max) {
			max = curValue;
			maxIdxs = [i];
		} else if (curValue === max) maxIdxs.push(i);
	}
	const chosenIdx = maxIdxs[Math.floor(Math.random() * maxIdxs.length)];
	const chosenMove = possibleMoves[chosenIdx];

	game.move(chosenMove);
	board.position(game.fen());
}
