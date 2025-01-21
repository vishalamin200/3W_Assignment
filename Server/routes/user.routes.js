import { Router } from "express";
import { allUsers, formSubmission } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router()


router.post('/submit', upload.array("images", 20), formSubmission)
router.get('/allUsers',allUsers)


export default router