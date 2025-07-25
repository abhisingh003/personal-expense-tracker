import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get(`/api/expenses/${user.id}`);
        setExpenses(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) fetchExpenses();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Expenses</h1>
      <ul className="space-y-2">
        {expenses.map((expense) => (
          <li key={expense._id} className="bg-white p-3 shadow rounded">
            <div className="font-semibold">{expense.title}</div>
            <div className="text-sm text-gray-600">₹{expense.amount} — {expense.category}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;