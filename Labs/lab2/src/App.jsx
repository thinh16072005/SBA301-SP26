import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './pages/Home.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import OrchidDetails from './pages/OrchidDetails.jsx';
import MainLayout from './components/MainLayout.jsx';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<MainLayout searchQuery={searchQuery} onSearchChange={setSearchQuery} />}>
          <Route path="/home" element={<Home searchQuery={searchQuery} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/orchid/:id" element={<OrchidDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
