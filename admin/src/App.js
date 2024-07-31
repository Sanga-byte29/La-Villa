import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Header from "./components/Header/Header";
import "./App.scss";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateRoom from "./pages/CreateRoom";
import Rooms from "./pages/Rooms/Rooms";
import Room from "./pages/Room/Room";
import EditRoom from "./pages/EditRoom/EditRoom";



function App() {

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path= "/" index element={<Home />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/rooms/create" element={<CreateRoom />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/all/:id" element={<Room />} />
          <Route path="/rooms/edit/:id" element={<EditRoom />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
