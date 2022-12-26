# Chess

This project constructs a web page where a user can play against a computer in chess. Before the game, the user can select a difficulty and a color to play as. After starting the game, the user can undo and redo their moves, restart the game, and start a new game.

Furthermore, the computer's three difficulties are three different chess engines. As of 12/26, the three chess engines are as follows: makeRandomMove, preferRandomCapture, and lazyMiniMax. The makeRandomMove engine makes a random move, while the preferRandomCapture engine makes a random capture or a random move (depending on whether there is a capture to be made or not). Lastly, the lazyMiniMax engine is essentially a preferBestCapture engine. However, the lazyMiniMax engine is designed similar to a miniMax engine where the computer looks only at its current move to maximize its position.

## What?

This project contains a public folder, a src folder, and a couple additional files. The public folder contains the basic HTML and CSS that the webpage has. Meanwhile, the src folder has a components folder, a utilities folder, a CSS file, and a JavaScript file. Each JavaScript file outside of the utilities folder is equivalent to a React component, and each React component with a file has an associated CSS file. The JavaScript files inside the utilities folder contains JavaScript that does not directly influence the UI and is needed across different UI components.

Lastly, this project was started with [Create React App](https://create-react-app.dev/). The chessboard comes from [react-chessboard](https://www.npmjs.com/package/react-chessboard), while the other UI elements comes from [react-bootstrap](https://react-bootstrap.github.io/).

## How?

1. Download the files.
2. Run npm start to generate the webpage.

## Future Plans

There are two different ways this project can grow. First, I can work on linking this up to a [server](https://github.com/chesslablab/chess-server). This would enable users to play against each other via a webpage. Second, I can improve my chess engine to be smarter.

## Why?

I found an article on chess engines, so I wanted to work on my own. Originally, this project was semi-completed using vanilla JS. However, I wanted to learn React. After completing a React tutorial, transitioning this project from vanilla JS to React seemed to be the next step to build my skills in React.

## Credits

-   [This article](https://www.chessengines.org/) for the original inspiration.
-   Tools used in building this project:
    1. [Create React App](https://create-react-app.dev/)
    2. [react-chessboard](https://www.npmjs.com/package/react-chessboard)
    3. [react-bootstrap](https://react-bootstrap.github.io/)
    4. Various VS Code Extensions including...
        - [Console Ninja](https://marketplace.visualstudio.com/items?itemName=WallabyJs.console-ninja)
        - [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
        - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
        - [Tabnine](https://marketplace.visualstudio.com/items?itemName=TabNine.tabnine-vscode)
