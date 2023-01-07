export const engines = {
	easy: makeRandomMove,
	medium: preferRandomCapture,
	hard: lazyMiniMax,
};

function makeRandomMove(game) {
	const possibleMoves = game.moves();
	const randomIdx = Math.floor(Math.random() * possibleMoves.length);
	let chosenMove = possibleMoves[randomIdx];
	return chosenMove;
}

function preferRandomCapture(game) {
	const possibleMoves = game.moves();
	const possibleCaptures = possibleMoves.filter((m) => m.includes('x'));

	let randomIdx, chosenMove;
	if (possibleCaptures.length) {
		randomIdx = Math.floor(Math.random() * possibleCaptures.length);
		chosenMove = possibleCaptures[randomIdx];
	} else {
		randomIdx = Math.floor(Math.random() * possibleMoves.length);
		chosenMove = possibleMoves[randomIdx];
	}
	return chosenMove;
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

function subtractPieces(fen, boardOrientation) {
	const positions = fen.split(' ')[0].split('');
	const valueForWhite = positions.reduce((t, v) => {
		const value = values[v] ?? 0;
		return t + value;
	}, 0);
	return boardOrientation === 'black' ? valueForWhite : -valueForWhite;
}

function lazyMiniMax(game, boardOrientation) {
	const possibleMoves = game.moves();
	let max = Number.NEGATIVE_INFINITY,
		maxIdxs;
	for (let i = 0; i < possibleMoves.length; i++) {
		const m = possibleMoves[i];
		game.move(m);
		const possibleFen = game.fen();
		game.undo();
		const curValue = subtractPieces(possibleFen, boardOrientation);
		if (curValue > max) {
			max = curValue;
			maxIdxs = [i];
		} else if (curValue === max) maxIdxs.push(i);
	}
	const chosenIdx = maxIdxs[Math.floor(Math.random() * maxIdxs.length)];
	const chosenMove = possibleMoves[chosenIdx];
	return chosenMove;
}
