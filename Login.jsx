import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    const key = `user:${username}`;
    let saved = localStorage.getItem(key);
    if (!saved) {
      saved = JSON.stringify({ username, credits: 100000 });
      localStorage.setItem(key, saved);
    }
    localStorage.setItem("user:active", saved);
    onLogin(JSON.parse(saved));
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: 50 }}>
      <h2>Masukkan Username</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
