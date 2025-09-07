import { AddTaskService, getAllTaskService, deleteTaskService } from "../services/task.service.js";

// Add Task Controller
export const AddTask = async (req, res) => {
  try {
    const { title, discription } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "title is required!",
        success: false,
      });
    }

    const newTask = await AddTaskService(title, discription);

    return res.status(201).json({
      message: "new task added",
      success: true,
      data: newTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server side error",
      error: error.message,
      success: false,
    });
  }
};

// Get All Tasks Controller
export const getTask = async (req, res) => {
  try {
    const tasks = await getAllTaskService();

    return res.status(200).json({
      message: "all tasks fetched!",
      success: true,
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server side error",
      error: error.message,
      success: false,
    });
  }
};

// Delete Task Controller
export const deletTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await deleteTaskService(id);

    if (!deletedTask) {
      return res.status(404).json({
        message: "task not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "task deleted successfully!",
      success: true,
      data: deletedTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server side error",
      error: error.message,
      success: false,
    });
  }
};
