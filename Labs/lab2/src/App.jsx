import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './pages/Home.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import OrchidDetails from './pages/OrchidDetails.jsx';
import MainLayout from './components/MainLayout.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleHomeClick = () => {
    setSearchQuery('');
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<MainLayout searchQuery={searchQuery} onSearchChange={setSearchQuery} onHomeClick={handleHomeClick} />}>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orchid/:id" element={<OrchidDetails />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App
