import React, { useState } from "react";

const chickenUrl =
  "https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg";
const bananaUrl =
  "https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768";

function getRandomImage(chickensLeft, bananasLeft) {
  const totalLeft = chickensLeft + bananasLeft;
  const roll = Math.random() * totalLeft;
  return roll < bananasLeft ? bananaUrl : chickenUrl;
}

function App() {
  const totalTiles = 36;
  const [bananasLeft, setBananasLeft] = useState(18);
  const [chickensLeft, setChickensLeft] = useState(18);
  const [tiles, setTiles] = useState(
    Array.from({ length: totalTiles }, () => ({
      revealed: false,
      image: null,
    }))
  );

  const handleClick = (index) => {
    if (tiles[index].revealed || bananasLeft + chickensLeft === 0) return;

    const image = getRandomImage(chickensLeft, bananasLeft);
    const newTiles = [...tiles];
    newTiles[index] = {
      revealed: true,
      image,
    };
    setTiles(newTiles);

    if (image === bananaUrl) {
      setBananasLeft((prev) => prev - 1);
    } else {
      setChickensLeft((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setBananasLeft(18);
    setChickensLeft(18);
    setTiles(
      Array.from({ length: totalTiles }, () => ({
        revealed: false,
        image: null,
      }))
    );
  };

  const tileStyle = {
    width: "80px",
    height: "80px",
    padding: 0,
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "bold",
    fontFamily: "'Courier New', Courier, monospace",
    backgroundColor: "#ff0033",
    color: "#ffff33",
    border: "2px solid #880000",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "8px",
  };

  const revealedTiles = tiles.filter((tile) => tile.revealed);
  const chickenRevealed = revealedTiles.filter((tile) => tile.image === chickenUrl).length;
  const bananaRevealed = revealedTiles.filter((tile) => tile.image === bananaUrl).length;
  const totalRevealed = revealedTiles.length;

  const chickenPercent = totalRevealed ? ((chickenRevealed / totalRevealed) * 100).toFixed(1) : 0;
  const bananaPercent = totalRevealed ? ((bananaRevealed / totalRevealed) * 100).toFixed(1) : 0;

  const leader =
    chickenRevealed > bananaRevealed
      ? "🐔 Chickens are winning!"
      : bananaRevealed > chickenRevealed
      ? "🍌 Bananas are winning!"
      : "🤝 It's a tie!";

  return (
    <div style={{ textAlign: "center" }}>
      <style>
        {`
          .tile-button:hover:not(:disabled) {
            background-color: #ffff33 !important;
            color: #ff0033 !important;
          }
        `}
      </style>

      <h1>🐔 Chicken or 🍌 Banana?</h1>
      <p>Click a tile to reveal what's underneath!</p>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "40px" }}>
        {/* Score Panel */}
        <div style={{ textAlign: "left", fontFamily: "'Courier New', monospace", color: "#ffff33" }}>
          <h3 style={{ marginBottom: "10px" }}>📊 Score</h3>
          <p>🐔 Chickens: {chickenRevealed} ({chickenPercent}%)</p>
          <p>🍌 Bananas: {bananaRevealed} ({bananaPercent}%)</p>
          <p style={{ marginTop: "10px", fontWeight: "bold" }}>{leader}</p>
        </div>

        {/* Grid */}
        <div style={{ display: "inline-block" }}>
          <table style={{ borderCollapse: "collapse" }}>
            <tbody>
              {[...Array(6)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {[...Array(6)].map((_, colIndex) => {
                    const index = rowIndex * 6 + colIndex;
                    const tile = tiles[index];
                    return (
                      <td key={colIndex} style={{ padding: "2px" }}>
                        <button
                          onClick={() => handleClick(index)}
                          className="tile-button"
                          style={tileStyle}
                        >
                          {tile.revealed ? (
                            <img src={tile.image} alt="Result" style={imgStyle} />
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
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleReset}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: "#222",
            color: "#ffff33",
            border: "2px solid #ff0033",
            borderRadius: "8px",
          }}
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
}

export default App;
