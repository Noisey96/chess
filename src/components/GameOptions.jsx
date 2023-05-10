export default function GameOptions(props) {
	let { history, future, onUndo, onRedo, onRestart, onEndGame } = props;

	function handleUndoClick() {
		onUndo();
	}

	function handleRedoClick() {
		onRedo();
	}

	function handleRestartClick() {
		onRestart();
	}

	function handleEndGameClick() {
		onEndGame();
	}

	return (
		<div className="m-2 flex w-4/6 max-w-2xl items-center justify-center gap-5">
			<button className="btn gap-1 text-lg" disabled={history.length < 2} onClick={handleUndoClick}>
				<ion-icon name="chevron-back-sharp" aria-hidden="true"></ion-icon>
				Undo
			</button>
			<button className="btn gap-1 text-lg" disabled={!future.length} onClick={handleRedoClick}>
				Redo
				<ion-icon name="chevron-forward-sharp"></ion-icon>
			</button>
			<button className="btn-secondary btn gap-1 text-lg" onClick={handleRestartClick}>
				Restart
				<ion-icon name="refresh-sharp"></ion-icon>
			</button>
			<button className="btn-accent btn gap-1 text-lg" onClick={handleEndGameClick}>
				End Game
				<ion-icon name="close-sharp"></ion-icon>
			</button>
		</div>
	);
}
