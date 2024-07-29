import { Link } from 'react-router-dom';
import "./header.styles.scss";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice';



const Header = () => {
  const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async() => {
    dispatch(logoutUser());
    // dispatch(reset());
  }



  return (
   <header className="main-header">
    <div className="container">
    <Link >
    <h1 className="logo">Hotel Name</h1>
    </Link>
    <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
          <Link to="/rooms/create">Create</Link>
          <button onClick={handleLogout}>Logout</button>
          </>
        ): (
          <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          </>
        )}

    </nav>
    </div>
   </header>
  )
}

export default Header