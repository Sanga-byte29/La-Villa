import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Header from "./components/Header/Header";
import "./App.scss";
import Dashboard from "./pages/Dashboard/Dashboard";


function App() {

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path= "/" index element={<Home />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
