import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditSurvey = () => {
  const location = useLocation();
  const { id, name2, description2 } = location.state || {};
  const [name, setName] = useState(name2);
  const [description, setDescription] = useState(description2);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurvey = async () => {
      const response = await fetch(`http://localhost:3000/api/v1/surveys/${id}`);
      const data = await response.json();
      setName(data.name);
      setDescription(data.description);
    };
    fetchSurvey();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/api/v1/surveys/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ survey: { name, description } }),
    });
    console.log(id, name, description);
    alert('Survey updated successfully!');
    navigate(`/`)
  };

  return (
    <div className="form-container">
      <div className="form-header">Edit Survey</div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Description:</label>
        <input type="text" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit" className="btn">Update Survey</button>
      </form>
    </div>
  );
}

export default EditSurvey;
