const { Router } = require("express");
const { getBookings, createBooking, updateBooking, deleteBooking, getBooking } = require("../controller/bookingController");



router = Router();


router.get("/", getBookings);
router.get("/:id" ,getBooking);
router.post("/", createBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);






module.exports = router
