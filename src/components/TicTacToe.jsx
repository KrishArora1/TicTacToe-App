import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import Reset from "./Reset";

const PLAYER_X = "X";
const PLAYER_O = "O";

const winningCombinations = [
    { combo: [0, 1, 2], strikeClass: "strike-row-1" },
    { combo: [3, 4, 5], strikeClass: "strike-row-2" },
    { combo: [6, 7, 8], strikeClass: "strike-row-3" },
    { combo: [0, 3, 6], strikeClass: "strike-column-1" },
    { combo: [1, 4, 7], strikeClass: "strike-column-2" },
    { combo: [2, 5, 8], strikeClass: "strike-column-3" },
    { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
    { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];

function TicTacToe() {
    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
    const [strikeClass, setStrikeClass] = useState();
    const [gameState, setGameState] = useState(GameState.inProgress);
    const [startingPlayer, setStartingPlayer] = useState(PLAYER_X);

    const [xWins, setXWins] = useState(0);
    const [oWins, setOWins] = useState(0);
    const [draws, setDraws] = useState(0);

    function checkWinner(tiles, setStrikeClass, setGameState) {
        for (const { combo, strikeClass } of winningCombinations) {
            const tileValue1 = tiles[combo[0]];
            const tileValue2 = tiles[combo[1]];
            const tileValue3 = tiles[combo[2]];
        
            if (tileValue1 !== null && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
                setStrikeClass(strikeClass);
                if (tileValue1 === PLAYER_X) {
                    setGameState(GameState.playerXWins);
                } else if (tileValue1 === PLAYER_O) {
                    setGameState(GameState.playerOWins);
                }
                return;
            }
        }

        const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
        if (areAllTilesFilledIn) {
            setGameState(GameState.draw);
        }
    }

    const handleTileClick = (index) => {
        if (gameState !== GameState.inProgress) {
            return;
        }
        
        if (tiles[index] !== null) {
            return;
        }
        
        const newTiles = [...tiles];
        newTiles[index] = playerTurn;
        setTiles(newTiles);

        if (playerTurn === PLAYER_X) {
            setPlayerTurn(PLAYER_O);
        } else {
            setPlayerTurn(PLAYER_X);
        }
    };

    const handleReset = () => {
        setGameState(GameState.inProgress);
        setTiles(Array(9).fill(null));
        const nextStartingPlayer = startingPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
        setStartingPlayer(nextStartingPlayer);
        setPlayerTurn(nextStartingPlayer);
        setStrikeClass(null);
    };

    const handleResetCounters = () => {
        setXWins(0);
        setOWins(0);
        setDraws(0);
    };

    useEffect(() => {
        checkWinner(tiles, setStrikeClass, setGameState);
    }, [tiles]);

    useEffect(() => {
        if (gameState === GameState.playerXWins) {
            setXWins(wins => wins + 1);
        } else if (gameState === GameState.playerOWins) {
            setOWins(wins => wins + 1);
        } else if (gameState === GameState.draw) {
            setDraws(draw => draw + 1);
        }
    }, [gameState]);

    return (
        <div className="game-container">
            {(gameState === GameState.playerXWins || gameState === GameState.playerOWins) && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={400}
                    gravity={0.25}
                />
            )}
            <div className="game-board">
                <h1>Tic Tac Toe</h1>
                <Board
                    playerTurn={playerTurn}
                    tiles={tiles}
                    onTileClick={handleTileClick}
                    strikeClass={strikeClass}
                />
                <GameOver gameState={gameState}/>
                <Reset gameState={gameState} onReset={handleReset}/>
            </div>

            <div className="win-counter-panel">
                <div className="win-counter-title">
                    Win Counters
                </div>
                <div className="win-counter-list">
                    <div className="win-counter-item">
                        <span>Player X:</span>
                        <span className="win-count">{xWins}</span>
                    </div>
                    <div className="win-counter-item">
                        <span>Player O:</span>
                        <span className="win-count">{oWins}</span>
                    </div>
                    <div className="win-counter-item">
                        <span>Draws:</span>
                        <span className="win-count">{draws}</span>
                    </div>
                </div>
                <button onClick={handleResetCounters} className="reset-counters-button">
                    Reset Counters
                </button>
            </div>
        </div>
    );
}

export default TicTacToe;