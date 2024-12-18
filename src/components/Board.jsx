import Tile from "./Tile";
import Strike from "./Strike";

function Board({ tiles, onTileClick, playerTurn, strikeClass }) {
    return (
        <div className="board">
            {tiles.map((value, index) => {
                const isRightBorder = (index + 1) % 3 !== 0;
                const isBottomBorder = index < 6;

                return (
                    <Tile 
                        key={index}
                        playerTurn={playerTurn}
                        onClick={() => onTileClick(index)}
                        value={value}
                        className={`${isRightBorder ? 'right-border' : ''} ${isBottomBorder ? 'bottom-border' : ''}`.trim()}
                    />
                );
            })}
            <Strike strikeClass={strikeClass}/>
        </div>
    );
}

export default Board;