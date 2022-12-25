/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

export default function Board(props) {
	let { opponent, boardOrientation } = props;
	const [game, setGame] = useState(new Chess());

	function runEngine() {
		if (opponent === 'easy') makeRandomMove();
		else if (opponent === 'medium') preferRandomCapture();
		else if (opponent === 'hard') lazyMiniMax();
	}

	function makeRandomMove() {
		const possibleMoves = game.moves();
		if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
			console.log(game.pgn());
			return;
		}
		const randomIdx = Math.floor(Math.random() * possibleMoves.length);
		safeGameMutate((game) => {
			game.move(possibleMoves[randomIdx]);
		});
	}

	function preferRandomCapture() {
		const possibleMoves = game.moves();
		if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
			console.log(game.pgn());
			return;
		}

		const possibleCaptures = possibleMoves.filter((m) => m.includes('x'));

		let randomIdx;
		if (possibleCaptures.length) {
			randomIdx = Math.floor(Math.random() * possibleCaptures.length);
			safeGameMutate((game) => {
				game.move(possibleCaptures[randomIdx]);
			});
		} else {
			randomIdx = Math.floor(Math.random() * possibleMoves.length);
			safeGameMutate((game) => {
				game.move(possibleMoves[randomIdx]);
			});
		}
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
		return player === 'black' ? valueForWhite : -valueForWhite;
	}

	function lazyMiniMax() {
		const possibleMoves = game.moves();
		if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
			console.log(game.pgn());
			return;
		}

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

		safeGameMutate((game) => {
			game.move(chosenMove);
		});
	}

	useEffect(() => {
		let started = false;
		if (!opponent) game.reset();
		else if (boardOrientation === 'black' && !started) {
			started = true;
			runEngine();
		}
	}, [opponent]);

	function onDrop(start, end) {
		const gameCopy = { ...game };
		const move = gameCopy.move({
			from: start,
			to: end,
		});
		setGame(gameCopy);

		if (move === null) return false;
		setTimeout(runEngine, 500);
		return true;
	}

	function safeGameMutate(modify) {
		setGame((g) => {
			const update = { ...g };
			modify(update);
			return update;
		});
	}

	return (
		<Chessboard
			arePiecesDraggable={opponent}
			boardOrientation={boardOrientation}
			onPieceDrop={onDrop}
			position={game.fen()}
		/>
	);
}
