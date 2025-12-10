import React, { useState, useEffect } from "react";
import "../css/style.css";

const cardImages = Array.from(
  { length: 35 },
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
  const [zoomedCard, setZoomedCard] = useState(null);

  useEffect(() => {
    const newCards = getRandomCards(cardImages, 10);
    setCards(newCards);

    setTimeout(() => setIsFlipped(true), 200);
  }, []);

  const shuffleCards = () => {
    setIsFlipped(false);

    setTimeout(() => {
      const newCards = getRandomCards(cardImages, 10);
      setCards(newCards);
      setTimeout(() => setIsFlipped(true), 50);
    }, 800);
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
                  onClick={() => setZoomedCard(card)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {zoomedCard && (
        <div className="zoom-overlay" onClick={() => setZoomedCard(null)}>
          <img src={zoomedCard.src} className="zoom-image" alt="zoom" />
        </div>
      )}

      <button className="new-game-button" onClick={shuffleCards}>
        Nova Igra
      </button>

      <footer>
        <p>
          Ova stranica je napravljena u edukacijske svrhe i samo za osobnu
          upotrebu. Sve ilustracije preuzete su s Dominion Strategy Wiki i
          Dominiona.
        </p>
        <br />
        <p>Izradio Tomo Opačak</p>
      </footer>
    </div>
  );
}
