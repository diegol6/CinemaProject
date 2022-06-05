import Home from './components/Home';
import Login from './components/Login';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";


function App() {
  return (
<Routes>
  <Route path="/Login" element={<Login />} />
  <Route path="/Home" element={<Home />} />
</Routes>    
  );
}

export default App;
