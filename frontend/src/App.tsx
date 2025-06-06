import { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  const fetchMessage = async () => {
    const res = await fetch('http://localhost:8080/api/message');
    const data = await res.text();
    setMessage(data);
  };

  return (
    <div>
      <h1>Credit Card Recommender</h1>
      <button onClick={fetchMessage}>Get Message</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
