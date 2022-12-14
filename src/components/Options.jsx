export default function Options(props) {
	let { history, future, onUndo, onRedo, onRestart, onNewGame } = props;

	function handleUndoClick() {
		onUndo();
	}

	function handleRedoClick() {
		onRedo();
	}

	function handleRestartClick() {
		onRestart();
	}

	function handleNewGameClick() {
		onNewGame();
	}

	return (
		<>
			<button className="btn" disabled={history.length < 2} onClick={handleUndoClick}>
				Undo
			</button>
			<button className="btn" disabled={!future.length} onClick={handleRedoClick}>
				Redo
			</button>
			<button className="btn-secondary btn" onClick={handleRestartClick}>
				Restart
			</button>
			<button className="btn-accent btn" onClick={handleNewGameClick}>
				New Game
			</button>
		</>
	);
}
