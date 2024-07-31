import React, { useEffect,useState } from 'react';
import {useSelector,useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../helper/utils';
import { createRoom ,reset } from '../features/room/roomSlice';




const CreateRoom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const {user} = useSelector(state => state.auth);

  const {isSuccess} = useSelector(state => state.room)
  const [files,setFiles] = useState("");
  const [formData,setFormData] = useState({
    name: "",
    price: "",
    desc: "",
    roomNumbers: "101,102,103,200"
  })

  const {name,price,desc,roomNumbers} = formData;

  useEffect(() => {
    if(!user){
      //navigate to login
      navigate("/login");
    }
  },[user,navigate]);
  const handleChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));

  }

  useEffect(() => {
    if(isSuccess) {
      dispatch(reset());
      navigate("/rooms")
    }
  },[isSuccess,dispatch,navigate]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);

  }
  console.log(files);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !roomNumbers) {
      return;
    }
  
    try {
      const roomArray = roomNumbers.split(",").map(item => {
        return {
          number: parseInt(item),
          unavailableDates: [],
        };
      });
  
      let list = [];
      list = await Promise.all(
        Object.values(files).map(async (file) => {
          try {
            const url = await uploadImage(file);
            return url;
          } catch (error) {
            console.error(`Error uploading file ${file.name}:`, error);
            return null; // or handle the error as needed
          }
        })
      );

      const dataToSubmit = {
        name,
        price,
        desc,
        roomNumbers: roomArray,
        img: list,
      };

      //dispatch createRoom fucntion
      dispatch(createRoom(dataToSubmit));
  
      // Filter out null values in case of upload errors
      list = list.filter(url => url !== null);
  
      console.log(list);
      console.log(roomArray);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  return (
    <div className="container">
    <div className="heading center"><strong>Create Room</strong></div>
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
        <input 
        type="text"
        name="name"
        value={name}
        placeholder="Enter room name" onChange={handleChange} />

        </div>
        <div className="input-group">
          <label htmlFor="name">Price</label>
        <input 
        type="text"
        name="price"
        value={price}
        placeholder="Enter price" onChange={handleChange} />

        </div>

        <div className="input-group">
          <label htmlFor="name">Description</label>
        <textarea 
        name="desc" onChange={handleChange}
        value={desc}
        ></textarea>

        </div>
        <div className="input-group">
          <label htmlFor="name">Room Numbers</label>
        <textarea 
        name="roomNumbers" 
        onChange={handleChange}
        value={roomNumbers}
        placeholder="Enter room numbers separated by commas eg: 202,203,204"
        ></textarea>

        </div>
        <div className="input-group">
          <label htmlFor="name">Images</label>
        <input 
        type="file"
        name="files"
        multiple
        onChange={handleFileChange} 
        />

        </div>
        <button type="submit">Submit</button>
      </form>

    </div>
    </div>
  )
}

export default CreateRoom