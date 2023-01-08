import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import './Options.css';

export default function Options(props) {
	let { history, currentMove, onUndo, onRedo, onRestart, onNewGame } = props;

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
		<Stack id="options" direction="horizontal" gap="3">
			<Button variant="secondary" disabled={history.length < 2} onClick={handleUndoClick}>
				Undo
			</Button>
			<Button
				variant="secondary"
				disabled={currentMove === history.length - 1}
				onClick={handleRedoClick}
			>
				Redo
			</Button>
			<Button variant="warning" onClick={handleRestartClick}>
				Restart
			</Button>
			<Button variant="danger" onClick={handleNewGameClick}>
				New Game
			</Button>
		</Stack>
	);
}
