import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AddSurvey from './Components/AddSurvey';
import Header from './Components/Header';
import SurveyList from './Components/SurveyList';
import EditSurvey from './Components/EditSurvey';

function App() {
  return (
    <>
      <h3>Welcome to Survey Manage Project</h3>
      <Header />
      <Routes>
        <Route path="/" element={<SurveyList />} />
        <Route path="/add-survey" element={<AddSurvey />} />
        <Route path="/edit-survey/:id" element={<EditSurvey />} />
      </Routes>
    </>
  );
}

export default App;
