import './App.css'
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import OrchidList from './components/OrchidList.jsx';

function App() {
  return (
    <>
      <div>
        <Header />
        <Container className='flex-grow-1 py-5 text-center'>
          <OrchidList />
        </Container>
        <Footer avatar="/images/orange_juice.webp" name="thinhph" email="hungthinh16072005@gmail.com" />
      </div>
    </>
  )
}

export default App
