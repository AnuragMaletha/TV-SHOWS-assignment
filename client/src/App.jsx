import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowList from './components/list/ShowList';
import ShowSummary from './components/summary/ShowSummary';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">      
        <Routes>
          <Route path="/" element={<ShowList />} />
          <Route path="/summary/:id" element={<ShowSummary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
