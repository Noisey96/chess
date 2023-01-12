# Chess

This project constructs a single page application where a user can play against a computer in chess. Before the game, the user can select a difficulty and a color to play as. After starting the game, the user can click and drag their pieces, undo and redo their moves, restart the game, and start a new game. Lastly, when the game has ended, the game is returned in the PGN format. You can load your PGN in [this website](https://www.chess.com/analysis) to analyze your game.

Furthermore, the computer's three difficulties are three different chess engines. As of 12/26, the three chess engines are as follows: makeRandomMove, preferRandomCapture, and lazyMiniMax. The makeRandomMove engine makes a random move, while the preferRandomCapture engine makes a random capture or a random move (depending on whether there is a capture to be made or not). Lastly, the lazyMiniMax engine is essentially a preferBestCapture engine. However, the lazyMiniMax engine is designed similar to a miniMax engine where the computer looks only at its current move to maximize its position.

## What?

This project contains a src folder and some additional files. The src folder has a components folder, a utilities folder, a CSS file, and a JSX file. Within the components folder, each JSX file with an associated CSS file is equivalent to a React component. Meanwhile within the utilities folder, there are two files: engines.js and functions.js. The engines.js file contains the three chess engines used by the application. The functions.js contains a couple functions to hide chess-specific logic.

Lastly, this project uses a [Vite](https://vitejs.dev/) React template with [TailwindCSS](https://tailwindcss.com/) included. The chessboard comes from [react-chessboard](https://www.npmjs.com/package/react-chessboard), while the other UI elements comes from [daisyUI](https://daisyui.com/).

## How?

1. Download the files.
2. Run npm dev to generate the SPA.

## Future Plans

There are three different ways this project can grow. First, I can implement more features such as selecting what to promote a pawn into. Second, I can work on linking this up to a [server](https://github.com/chesslablab/chess-server). This would enable users to play against each other within the app. Third, I can improve my chess engine to be smarter.

## Why?

I found an article on chess engines, so I wanted to work on my own. Originally, this project was completed using vanilla JS. However, I wanted to learn React. After completing a React tutorial, transitioning this project from vanilla JS to React seemed to be the next step to build my skills in React. Next, I transitioned this project from using a [Create React App](https://create-react-app.dev/) template to a [Vite](https://vitejs.dev/) template to increase the number of tools I have worked with. Lastly, I transitioned this project from using [react-bootstrap](https://react-bootstrap.github.io/) to using [TailwindCSS](https://tailwindcss.com/) and [daisyUI](https://daisyui.com/) to have more control over my user interface.

## Credits

-   [This article](https://www.chessengines.org/) for the original inspiration.
-   Tools used in final project:
    1. [chess.js](https://www.npmjs.com/package/chess.js)
    2. [daisyUI](https://daisyui.com/)
    3. [react-chessboard](https://www.npmjs.com/package/react-chessboard)
    4. [TailwindCSS](https://tailwindcss.com/)
    5. [Vite](https://vitejs.dev/)
    6. Various VS Code Extensions including...
        - [Console Ninja](https://marketplace.visualstudio.com/items?itemName=WallabyJs.console-ninja)
        - [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
        - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
        - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
        - [Tabnine](https://marketplace.visualstudio.com/items?itemName=TabNine.tabnine-vscode)
