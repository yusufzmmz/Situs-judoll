import React, { useState } from 'react';
import Login from './Login';
import SlotGame from './SlotGame';

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user:active");
    return saved ? JSON.parse(saved) : null;
  });

  if (!user) return <Login onLogin={setUser} />;
  return <SlotGame user={user} onLogout={() => setUser(null)} />;
}
