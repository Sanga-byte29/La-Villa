import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRooms,reset } from '../../features/room/roomSlice';
import RoomList from '../../components/RoomList/RoomList';


const Rooms = () => {
    const dispatch = useDispatch();
    const { rooms,isSuccess} = useSelector((state) => state.room);
    

    useEffect(() => {
        dispatch(getRooms());
      }, []);

    useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [isSuccess]);
  return (
    <div className="heading center">
      <div className="container">

        <strong>Rooms </strong>
        {rooms && rooms.length  > 0 ? <RoomList data={rooms} /> : null}
      </div>
     </div>
  )
}

export default Rooms