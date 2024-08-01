import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddSurvey() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError('Name is required');
      return;
    }
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/v1/surveys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ survey: { name, description } }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setSuccess('Survey created successfully!');
      navigate(`/edit-survey/${data.data.id}`, { state: { id: data.data.id, name2: data.data.name, description2: data.data.description } });
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to create survey');
    }
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
    {success && <p style={{ color: 'green' }}>{success}</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
    </div>
    );
  }
