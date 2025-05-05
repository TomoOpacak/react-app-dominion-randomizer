import React, { useState, useEffect } from "react";
import "../css/style.css";

const cardImages = Array.from(
  { length: 30 },
  (_, i) => `${process.env.PUBLIC_URL}/cards/card${i + 1}.webp`
);

function getRandomCards(cardArray, count) {
  const shuffled = [...cardArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((src, i) => ({
    id: `${Date.now()}-${i}`, // Unique ID for key
    src,
  }));
}

export default function CardGame() {
  const [cards, setCards] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);

  // Load cards on mount and trigger initial flip
  useEffect(() => {
    const newCards = getRandomCards(cardImages, 10);
    setCards(newCards);

    // Trigger initial flip after slight delay
    setTimeout(() => {
      setIsFlipped(true);
    }, 200);
  }, []);

  const shuffleCards = () => {
    setIsFlipped(false); // Flip back first

    setTimeout(() => {
      const newCards = getRandomCards(cardImages, 10);
      setCards(newCards);

      setTimeout(() => {
        setIsFlipped(true); // Flip to front
      }, 50);
    }, 800); // Wait for back flip to finish
  };

  return (
    <div className="card-game">
      <h1 className="title">DOMINION - Nasumična igra</h1>
      <div className="card-grid">
        {cards.map((card, index) => (
          <div key={card.id} className="card">
            <div
              className={`card-inner ${isFlipped ? "flipped" : ""}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="card-back">
                <img
                  src={`${process.env.PUBLIC_URL}/cards/back.webp`}
                  alt="Card back"
                  className="card-image"
                />
              </div>
              <div className="card-front">
                <img
                  src={card.src}
                  alt={`Card ${index + 1}`}
                  className="card-image"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="new-game-button" onClick={shuffleCards}>
        Nova Igra
      </button>

      <footer>
        <p>
          This page is made for educational purposes and only for personal use.
          All art provided from Dominion Strategy Wiki and Dominion.
        </p>
        <p>Translation made by Reattera</p>
      </footer>
    </div>
  );
}
