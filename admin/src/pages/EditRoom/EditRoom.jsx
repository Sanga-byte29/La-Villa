import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { reset, updateRoom } from '../../features/room/roomSlice';
import { useDispatch, useSelector } from 'react-redux';





const EditRoom = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSuccess } = useSelector((state) => state.room);
    const {id} = useParams();
    const [formData,setFormData] = useState({
    name: "",
    price: "",
    desc: "",
    roomNumbers: "",
    });

    const { name, price, desc, roomNumbers } = formData;

    useEffect(() => {
        const getRoom = async() => {
            try {
                const res = await fetch(`/api/rooms/${id}`);
                const data = await res.json();
                const { roomNumbers, ...rest } = data;
                const roomMap = roomNumbers.map((item) => item.number);
                const roomString = roomMap.join(",");
                        setFormData({
                        ...rest,
                        roomNumbers: roomString,
                        });
            } catch (error) {
                console.log(error)
            }

        }
        getRoom();
    },[id]);

    useEffect(() => {
        if(isSuccess){
            //navigate to room
            dispatch(reset());
            navigate('/rooms');
        }
    },[isSuccess])

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }));

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !price || !roomNumbers) {
            return;
          }
        
    const roomArray = roomNumbers.split(",").map((item) => {
        return {
              number: parseInt(item),
              unavailableDates: [],
            };
          });
    const dataToSubmit = {
            name,
            price,
            desc,
            roomNumbers: roomArray,
            roomId: id,
          };
    dispatch(updateRoom(dataToSubmit));

    };



  return (
    < >
    <div className="container">
      <h1 className="heading center"><strong>Edit Room</strong></h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter room name"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              value={price}
              placeholder="Enter room name"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="desc">Description</label>
            <textarea
              name="desc"
              onChange={handleChange}
              value={desc}
            ></textarea>
          </div>

          <div className="input-group">
            <label htmlFor="desc">Room Numbers</label>
            <textarea
              name="roomNumbers"
              onChange={handleChange}
              value={roomNumbers}
              placeholder="enter room numbers seperated by commas eg: 202, 203, 204, 400"
            ></textarea>
          </div>

          <button type="submit">Edit Room</button>
        </form>
      </div>
    </div>
    </>
  )
}

export default EditRoom