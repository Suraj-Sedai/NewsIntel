// src/components/Register.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Register() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username:'', email:'', password:'' });

  const submit = async e => {
    e.preventDefault();
    const res = await fetch('/news/auth/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const userData = await res.json();
    // After registering, auto‑log them in
    // You could also request a token here, but for simplicity:
    // fetch the login token automatically:
    const loginRes = await fetch('/news/auth/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: form.username, password: form.password })
    });
    const { access } = await loginRes.json();
    login(access);
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Username"
        value={form.username}
        onChange={e=>setForm({...form, username:e.target.value})}
      />
      <input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={e=>setForm({...form, email:e.target.value})}
      />
      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={e=>setForm({...form, password:e.target.value})}
      />
      <button>Create Account</button>
    </form>
  );
}
