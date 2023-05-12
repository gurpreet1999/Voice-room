const activateController = require("../controllers/activateController")
const { activate } = require("../controllers/activateController")
const authController = require("../controllers/authController")
const roomsController = require("../controllers/roomsController")
const authMiddleware = require("../middleware/authMiddleware")

const singleRoute=require("express").Router()


singleRoute.post("/api/send-otp",authController.sendOtp)
singleRoute.post("/api/verify-otp",authController.verifyOtp)



//hume is route me ussi ko allowed krna he jiske pass valid access token he 


singleRoute.post("/api/activate",authMiddleware,activateController.activate)
singleRoute.post("/api/refresh",authController.refresh)
singleRoute.post("/api/logout",authMiddleware,authController.logout)
singleRoute.post("/api/rooms",authMiddleware,roomsController.create)
singleRoute.get("/api/rooms",authMiddleware,roomsController.index)



module.exports=singleRoute