// import React from 'react';
import React, { useState } from 'react';

export default function AddSurvey(){
	// const SurveyForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState('');

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
    setSuccess('Survey created successfully!');
  };
	return(
		<div className="form-container">
      <div className="form-header">Add Survey</div>
			<form onSubmit={handleSubmit}>
				<label> Name:</label>
				<input type="text" placeholder="Enter Name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
				<label> Description:</label>
				<input type="text" placeholder="Enter Description" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
			  <button className="btn">Add Survey </button>
			  {success && <p style={{ color: 'green' }}>{success}</p>}
			</form>
		</div>	
		)
}
