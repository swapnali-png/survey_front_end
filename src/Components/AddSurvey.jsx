import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddSurvey() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/v1/surveys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ survey: { name, description } }),
    });
    const data = await response.json();
    console.log(data);
    navigate(`/edit-survey/${data.data.id}`, { state: { id: data.data.id, name2: data.data.name, description2: data.data.description } });
  };

  return (
    <div className="form-container">
      <div className="form-header">Add Survey</div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Description:</label>
        <input type="text" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit" className="btn">Add Survey</button>
      </form>
    </div>
  );
}
