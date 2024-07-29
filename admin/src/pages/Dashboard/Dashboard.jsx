import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector (state => state.auth);


    useEffect(() => {
        if(!user){
            navigate("/login");
        }
    },[user,dispatch,navigate]);

  return (
     <div className="heading center">
        <strong>Dashboard</strong>
     </div>
  )
}

export default Dashboard