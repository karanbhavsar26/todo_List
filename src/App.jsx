import { useState, useEffect } from 'react';
import './App.css';
import { createTodo, getAlllist, updateTodo } from '../services/todoListServices';

function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [updateInput, setUpdateInput] = useState({});

  const addTodo = async (input) => {
    if (!input) {
      return alert('Todo should not be empty');
    }
    const newData = {
      todo: input,
      isUpdate: false,
      id: Date.now(),
      userId: 100,
    };
    setUpdateInput((prev) => ({ ...prev, [newData.id]: input }));
    setData((prev) => [...prev, newData]);
    setInput("");
  };

  const deleteTask = async (id) => {
    setData((prevData) => prevData.filter((todo) => todo.id !== id));
  };

  const updateTask = async (id) => {
    setData((prevData) =>
      prevData.map((todo) =>
        todo.id === id ? { ...todo, isUpdate: true } : todo
      )
    );
  };

  const updateInputTask = async (id, input) => {
    setData((prevData) =>
      prevData.map((todo) =>
        todo.id === id ? { ...todo, isUpdate: false, todo: input } : todo
      )
    );
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-[800px]">
        <div className='flex justify-center items-center gap-2 p-2'>
          <input
            type="text"
            placeholder="Enter todo here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="p-2 border rounded w-full"
          />
          <button type="submit" className="bg-blue-500 text-white rounded" onClick={() => addTodo(input)}>
            ADD
          </button>
        </div>
        <ul className="space-y-4">
          {data.map((item) => (
            <li key={item.id} className="flex justify-between gap-2 p-4 bg-gray-200 rounded">
              {item.isUpdate ? (
                <input
                  type="text"
                  placeholder="Type here..."
                  value={updateInput[item.id]}
                  onChange={(e) => setUpdateInput((prev) => ({ ...prev, [item.id]: e.target.value }))}
                  className="p-2 border rounded w-full"
                />
              ) : (
                <h2 className="text-xl font-bold">{item.todo}</h2>
              )}
              <div className='flex gap-2'>
                <button className="text-red-500 font-semibold" onClick={() => deleteTask(item.id)}>
                  Delete
                </button>
                {item.isUpdate ? (
                  <button
                    onClick={() => updateInputTask(item.id, updateInput[item.id])}
                    className="text-green-500 font-semibold"
                  >
                    Done
                  </button>
                ) : (
                  <button
                    onClick={() => updateTask(item.id)}
                    className="text-red-500 font-semibold"
                  >
                    Edit
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
