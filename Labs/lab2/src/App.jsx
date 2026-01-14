import { useState } from 'react';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './pages/Home.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import OrchidDetails from './pages/OrchidDetails.jsx';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {!isLoginPage && <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home searchQuery={searchQuery} />}/>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orchid/:id" element={<OrchidDetails />} />
      </Routes>
      {!isLoginPage && <Footer avatar="/images/orange_juice.webp" name="thinhph" email="hungthinh16072005@gmail.com" />}
    </>
  );
}

function App() {
  return (
    <>
      <div>
        <Router>
          <AppContent />
        </Router>

      </div>
    </>
  )
}

export default App
