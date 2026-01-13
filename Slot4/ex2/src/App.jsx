import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './pages/Home.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import OrchidDetails from './pages/OrchidDetails.jsx';

function App() {
  return (
    <>
      <div>
        <Router>
          <Header />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home/>}/>
            <Route path="/contact" element={<Contact />} />
            <Route path="/orchid/:id" element={<OrchidDetails />} />
          </Routes>
          <Footer avatar="/images/orange_juice.webp" name="thinhph" email="hungthinh16072005@gmail.com" />
        </Router>

      </div>
    </>
  )
}

export default App
