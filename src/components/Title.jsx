import './Title.css';

export default function Title(props) {
	let { opponent } = props;
	return (
		<div className={opponent ? 'hidden' : undefined}>
			<div id="title">Chess</div>
			<div id="description">Play a game of chess against a computer!</div>
		</div>
	);
}
