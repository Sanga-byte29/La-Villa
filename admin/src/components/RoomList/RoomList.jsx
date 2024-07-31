import React from 'react'
import "./roomlist.styles.scss";
import { Link } from 'react-router-dom';
import Caraousel from '../Caraousel/Caraousel';


const RoomList = ({data}) => {
  return (
    <div id="room-list">
        {data.map((item,index) => {
            return (
                <Link 
                to={`/rooms/all/${item._id}`}
                key={item._id}
                className="room-unit"
                >
                <div className="img-wrapper">
                <Caraousel data={item.img} />
                </div>
                <p>{item.name}</p>
                </Link>
            )
        })}
    </div>
  )
}

export default RoomList