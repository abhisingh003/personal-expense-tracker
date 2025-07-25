import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function AddExpense() {
  const [form, setForm] = useState({ title: '', amount: '', category: '' });
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/expenses', { ...form, user: user.id });
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to add expense');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Add Expense</h2>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="mb-3 w-full p-2 border rounded" required />
        <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} className="mb-3 w-full p-2 border rounded" required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="mb-3 w-full p-2 border rounded" required />
        <button type="submit" className="w-full bg-purple-500 text-white p-2 rounded">Add</button>
      </form>
    </div>
  );
}

export default AddExpense;