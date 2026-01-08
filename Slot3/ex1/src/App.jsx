import './App.css'
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'
import Orchid from './components/Orchid.jsx';

function App() {
  return (
      <>
          <Header/>
          <Orchid/>
          <Footer avatar="/images/orange_juice.webp" name="thinhph" email="hungthinh16072005@gmail.com" />
      </>
  )
}

export default App
