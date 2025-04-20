import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username:'', password:'' });
  const submit = async e => {
    e.preventDefault();
    const res = await fetch('/news/auth/login/', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(form)
    });
    const data = await res.json();
    login(data.access);
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Username"
             value={form.username}
             onChange={e => setForm({...form, username:e.target.value})}
      />
      <input placeholder="Password" type="password"
             value={form.password}
             onChange={e => setForm({...form, password:e.target.value})}
      />
      <button>Log In</button>
    </form>
  );
}
