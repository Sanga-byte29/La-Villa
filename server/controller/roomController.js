const Room = require("../models/roomModels");
const mongoose = require('mongoose');

const getRooms = async(req,res) => {

    try {
    const rooms = await Room.find();

    if(!rooms){
        res.status(400);
        throw new Error("No rooms found");
    }
    return res.status(200).json(rooms);
    } catch (error) {
        next(error)
    }
};


//create room
const createRoom = async(req,res,next) => {
    try {
        // todo validate data from user with joi
        const room = await Room.create(req.body)
        if(!room){
            res.status(400);
            throw new Error("There was an error ");
        }
        const rooms = await Room.find();
        return res.status(201).json(rooms);
    } catch (error) {
        next(error);
    }

}
//get single room
const getRoom = async (req, res, next) => {
    try {
      // Validate the ObjectId format
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid room ID format" });
      }
  
      const room = await Room.findById(req.params.id);
  
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }
  
      return res.status(200).json(room);
    } catch (error) {
      next(error);
    }
  };

//update Rooms
const updateRoom = async(req,res,next) => {
    try{
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id,{
            $set: req.body,
        }, {new: true});
        if(!updatedRoom){
            res.status(400)
            throw new Error("Cannot updated room")
        }
        return res.status(200).json(updatedRoom);
    } 
    catch (error) {
        next(error)
    }
}
//delete room
const deleteRoom = async(req,res) => {
    try{
        const deletedRoom = await Room.findByIdAndDelete(req.params.id);
        if(!deletedRoom){
            res.status(400)
            throw new Error("Cannot delete room")
        }
        return res.status(200).json({id: req.params.id});
    }
    catch(error){
        next(error);
    }
}

module.exports = {
    getRooms,
    createRoom,
    getRoom,
    updateRoom,
    deleteRoom
}

