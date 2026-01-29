import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router-dom";

import ListOfOrchids from "./components/ListOfOrchids.jsx";
import NavBar from "./components/NavBar.jsx";
import EditOrchid from "./components/EditOrchid.jsx";
import AddOrchid from "./components/AddOrchid.jsx";

function App() {
  return (
    <>
        <NavBar />
        <Routes>
            <Route path="/" element={<ListOfOrchids />} />
            <Route path="/orchids/new" element={<AddOrchid />} />
            <Route path="/orchids/:id/edit" element={<EditOrchid />} />
        </Routes>
    </>
  )
}

export default App
