import Home from './components/Home';
import Login from './components/Login';
import Movies from './components/Movies';
import NavBar from './components/NavBar';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";


function App() {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/movies/:id" element={<Movies/>} />
    </Routes>
    </>    
  );
}

export default App;
