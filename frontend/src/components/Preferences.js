import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Preferences() {
  const { token } = useContext(AuthContext);
  const [cats, setCats] = useState([]);
  const allCats = ['business','entertainment','health','science','sports','technology'];

  useEffect(() => {
    fetch('/news/auth/preferences/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(r=>r.json())
    .then(d=>setCats(d.categories));
  }, [token]);

  const toggle = cat => {
    setCats(prev =>
      prev.includes(cat) ? prev.filter(c=>c!==cat) : [...prev,cat]
    );
  };

  const save = () => {
    fetch('/news/auth/preferences/', {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ categories: cats })
    });
  };

  return (
    <div>
      <h2>Your Categories</h2>
      {allCats.map(cat => (
        <label key={cat}>
          <input
            type="checkbox"
            checked={cats.includes(cat)}
            onChange={()=>toggle(cat)}
          />
          {cat}
        </label>
      ))}
      <button onClick={save}>Save Preferences</button>
    </div>
  );
}
