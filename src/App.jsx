import { useState } from 'react'
import './App.css'
import AddSurvey from './Components/AddSurvey'
import Header from './Components/Header'
import SurveyList from './Components/SurveyList'

function App() {
  return (
    <div className="mainHeader">
     <Header/>
      <AddSurvey/>
    </div>
  )
}

export default App
