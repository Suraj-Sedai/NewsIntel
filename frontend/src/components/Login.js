// src/components/Login.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
  console.log('🔐 Login rendered');
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username:'', password:'' });

  const submit = async e => {
    e.preventDefault();
    // ...
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input
          placeholder="Username"
          value={form.username}
          onChange={e=>setForm({...form, username:e.target.value})}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e=>setForm({...form, password:e.target.value})}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
