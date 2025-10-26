import taskModel from '../model/task.model.js';

export const AddTaskService = async (title, discription) => {
    return await taskModel.create({ title, discription });
};

export const getAllTaskService = async () => {
    return await taskModel.find({});
};

export const deleteTaskService = async (id) => {
    return await taskModel.findByIdAndDelete(id);
};
