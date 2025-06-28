import React, { useState } from "react";

const chickenUrl =
  "https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg";
const bananaUrl =
  "https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768";

function getRandomImage() {
  return Math.random() < 0.5 ? bananaUrl : chickenUrl;
}

function App() {
  const totalTiles = 36;

  const [tiles, setTiles] = useState(
    Array.from({ length: totalTiles }, () => ({
      revealed: false,
      image: null,
      owner: null,
    }))
  );

  const [currentPlayer, setCurrentPlayer] = useState(1);

  const handleClick = (index) => {
    if (tiles[index].revealed) return;

    const image = getRandomImage();
    const newTiles = [...tiles];
    newTiles[index] = {
      revealed: true,
      image: image,
      owner: currentPlayer,
    };
    setTiles(newTiles);
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  const getStats = (player, targetImage) => {
    const claimed = tiles.filter((tile) => tile.owner === player);
    const correct = claimed.filter((tile) => tile.image === targetImage);
    const percentage =
      claimed.length > 0 ? (correct.length / claimed.length) * 100 : 0;
    return {
      claimed: claimed.length,
      correct: correct.length,
      percentage: percentage.toFixed(1),
    };
  };

  const p1Stats = getStats(1, chickenUrl);
  const p2Stats = getStats(2, bananaUrl);

  return (
    <div>
      <h1>Chicken Banana Game</h1>
      <h2>Current Player: Player {currentPlayer}</h2>

      <p>
        Player 1 (Chicken) — {p1Stats.correct} correct out of {p1Stats.claimed}{" "}
        = {p1Stats.percentage}%
      </p>
      <p>
        Player 2 (Banana) — {p2Stats.correct} correct out of {p2Stats.claimed} ={" "}
        {p2Stats.percentage}%
      </p>

      <table>
        <tbody>
          {[...Array(6)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(6)].map((_, colIndex) => {
                const index = rowIndex * 6 + colIndex;
                const tile = tiles[index];
                return (
                  <td key={colIndex}>
                    <button onClick={() => handleClick(index)}>
                      {tile.revealed ? (
                        <img
                          src={tile.image}
                          alt="Result"
                          width="80"
                          height="80"
                        />
                      ) : (
                        index + 1
                      )}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {tiles.every((tile) => tile.revealed) && (
        <h2>
          Game Over —{" "}
          {p1Stats.percentage > p2Stats.percentage
            ? "Player 1 Wins!"
            : p1Stats.percentage < p2Stats.percentage
            ? "Player 2 Wins!"
            : "It's a Tie!"}
        </h2>
      )}
    </div>
  );
}

export default App;
