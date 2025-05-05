import React, { useState, useEffect } from "react";
import "../css/style.css"; // Import your CSS file here

const cardImages = Array.from(
  { length: 30 },
  (_, i) => `${process.env.PUBLIC_URL}/cards/card${i + 1}.png`
);

function getRandomCards(cardArray, count) {
  const shuffled = [...cardArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function CardGame() {
  const [selectedCards, setSelectedCards] = useState([]);

  const shuffleCards = () => {
    const newCards = getRandomCards(cardImages, 10);
    setSelectedCards(newCards);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="card-game">
      <h1 className="title">Card Game</h1>
      <div className="card-grid">
        {selectedCards.map((card, index) => (
          <img
            key={index}
            src={card}
            alt={`Card ${index + 1}`}
            className="card-image"
          />
        ))}
      </div>
      <button className="new-game-button" onClick={shuffleCards}>
        New Game
      </button>
    </div>
  );
}
