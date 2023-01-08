import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import './Options.css';

export default function Options(props) {
	let { onUndo, onRedo, onRestart, onNewGame } = props;

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
			<Button variant="secondary" disabled={true} onClick={handleUndoClick}>
				Undo
			</Button>
			<Button variant="secondary" disabled={true} onClick={handleRedoClick}>
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
