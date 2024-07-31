import "./room.styles.scss";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteRoom, reset } from "../../features/room/roomSlice";
import Caraousel from "../../components/Caraousel/Caraousel";







const Room = () => {
    const { user } = useSelector((state) => state.auth);
    const { isSuccess } = useSelector((state) => state.room);
    const {id} = useParams();
    const [room,setRoom] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(isSuccess){
            //navigate to rooms
            navigate("/rooms");
            dispatch(reset());
        }
    },[isSuccess,navigate,dispatch]);




    useEffect(() => {
        const getRoom = async ( ) => {
            try {
                const res = await fetch(`/api/rooms/${id}`)

                if(res.ok){
                    const data = await res.json();

                    setRoom(data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getRoom();
    },[id]);

    const handleDelete = () => {
        dispatch(deleteRoom(id));
    }
    console.log(room);
  return (
    <div id="room">
        <div className="container">

        {room ? (
            <>
            <div className="img-wrapper">
                {/* <img src={room.img[0]} alt="" width="900" height="550"/> */}
            <Caraousel data={room.img}/>
            </div>
            <div className="text-wrapper">
            <h2><strong> {room.name} </strong></h2>
            <p> {room.desc} </p>
            <h2> ${room.price.toFixed(2)} </h2>


            {/* user */}
            {user && user.isAdmin ? (
                <div className="cta-wrapper">
                <Link to={`/rooms/edit/${room._id}`}>
                <button>Edit Room</button>
                </Link>
                <button onClick={handleDelete}>Delete Room</button>
              </div>
            ):null}
            </div>
            </>
        ):null}

        </div>
     </div>
  )
}

export default Room