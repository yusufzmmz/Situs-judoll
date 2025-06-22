import React, { useState } from 'react';

const slotSymbols = ['🍒', '🍋', '🔔', '🍀', '💎', '7️⃣'];
const betOptions = [800, 1500, 5000, 10000, 100000];
const multipliers = [1, 2, 5, 8, 10, 20];

export default function SlotGame({ user, onLogout }) {
  const [reels, setReels] = useState(['🍒', '🍒', '🍒']);
  const [message, setMessage] = useState('');
  const [bet, setBet] = useState(10000);
  const [credits, setCredits] = useState(user.credits);

  const spin = () => {
    if (credits < bet) {
      setMessage("💸 Saldo tidak cukup");
      return;
    }

    const newReels = Array(3).fill().map(() => slotSymbols[Math.floor(Math.random() * slotSymbols.length)]);

    let multiplier = 0;
    if (newReels.every(s => s === newReels[0])) {
      multiplier = multipliers[Math.floor(Math.random() * multipliers.length)];
    }

    const won = bet * multiplier;
    const newCredits = credits - bet + won;
    const updatedUser = { ...user, credits: newCredits };
    localStorage.setItem(`user:${user.username}`, JSON.stringify(updatedUser));
    localStorage.setItem("user:active", JSON.stringify(updatedUser));

    setCredits(newCredits);
    setReels(newReels);
    setMessage(multiplier > 0 ? `🎉 Menang! x${multiplier} → +${won.toLocaleString()}` : "😢 Coba lagi!");
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: 30 }}>
      <h1>🎰 Slot Game</h1>
      <p>Kredit: {credits.toLocaleString()}</p>
      <div>
        {betOptions.map(b => (
          <button key={b} onClick={() => setBet(b)} style={{ margin: 5, fontWeight: bet === b ? 'bold' : 'normal' }}>
            {b.toLocaleString()}
          </button>
        ))}
      </div>
      <div style={{ fontSize: 50, margin: 20 }}>{reels.join(' ')}</div>
      <button onClick={spin}>SPIN ({bet.toLocaleString()})</button>
      <p>{message}</p>
      <button onClick={onLogout} style={{ marginTop: 20 }}>Logout</button>
    </div>
  );
}
