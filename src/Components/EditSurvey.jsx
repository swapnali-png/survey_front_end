import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import FabricCanvas from './FabricCanvas';

const EditSurvey = () => {
  const location = useLocation();
  const { id, name2, description2 } = location.state || {};
  const [name, setName] = useState(name2);
  const [description, setDescription] = useState(description2);
  const navigate = useNavigate();
  const { survey } = location.state || {};
  const childRef = useRef(null);
  const [canvasData, setCanvasData] = useState('');

  useEffect(() => {
    const fetchSurvey = async () => {
      const response = await fetch(`http://localhost:3000/api/v1/surveys/${id}`);
      const data = await response.json();
      setName(data.name);
      setDescription(data.description);
      setCanvasData(data.survey_detail ? data.survey_detail.coordinates : '');
    };
    fetchSurvey();
  }, [id, survey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/api/v1/surveys/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ survey: { 
      	name, 
      	description,
      	survey_detail_attributes: {
          coordinates: canvasData
        } 
      } 
    	}),
    });
    console.log(id, name, description);
    alert('Survey updated successfully!');
    navigate(`/`);
  };

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData('type', type);
  };

  const handleCanvasChange = (data) => {
    setCanvasData(data);
    console.log(data);
  };

  const fetchDataFromChild = () => {
    if (childRef.current) {
      const childData = childRef.current.getData();
      console.log(childData);
      setData(childData);
    }
  };

  return (
    <div className="board">
      <div className="left-pane">
        <div className="edit-form-container">
          <div className="edit-form-header">Edit Survey</div>
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input className="edit-input" type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <label>Description:</label>
            <input className="edit-input" type="text" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button type="submit" className="edit-btn" onClick={fetchDataFromChild()}>Update Survey</button>
          </form>
        </div>
        <div className="toolbox">
          <div
            className="toolbox-item"
            draggable
            onDragStart={(e) => handleDragStart(e, 'textbox')}
          >
            Textbox
          </div>
          <div
            className="toolbox-item"
            draggable
            onDragStart={(e) => handleDragStart(e, 'label')}
          >
            Label
          </div>
        </div>
      </div>
      <div className="right-pane">
        <FabricCanvas onCanvasChange={handleCanvasChange} />
      </div>
    </div>
  );
}

export default EditSurvey;
