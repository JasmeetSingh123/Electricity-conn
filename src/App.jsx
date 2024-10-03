import './App.css';
import { AddUser, Chart, EditUser, Home } from './pages';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/chart" element={<Chart />} />
      </Routes>
    </Router>
  );
}


export default App;

