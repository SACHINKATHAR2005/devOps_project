import express from 'express';
import { AddTask, deletTask, getTask } from '../controller/task.controller.js';

const router = express.Router();

router.post("/create",AddTask)

// /task/create
router.get("/getall",getTask);
// /task/getall
router.delete("/delete/:id",deletTask);
// /task/delete/:id
export default router