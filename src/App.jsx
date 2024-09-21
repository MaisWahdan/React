import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import HomePage from './HomePage.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import UserProfile from './UserProfile.jsx';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/users/:id" element={<UserProfile />} />
            </Routes>
        </Router>
    );
}

export default App;
