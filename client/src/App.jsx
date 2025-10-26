import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // ✅ new import for description
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useEffect } from 'react';
import { axiosInstance } from './api/api';
import { Toaster, toast } from 'sonner';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState(''); // ✅ description state
    const [loading, setLoading] = useState(false);

    // Fetch all tasks
    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/task/getall');
            setTasks(response.data.data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    // Add new task
    const addTask = async () => {
        if (!newTitle.trim()) return;
        try {
            const response = await axiosInstance.post('/task/create', {
                title: newTitle,
                discription: newDescription,
            });
            setTasks([...tasks, response.data.data]);
            setNewTitle('');
            setNewDescription('');
            toast.success('Task added successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to add task');
        }
    };

    // Delete task
    const deleteTask = async (id) => {
        try {
            await axiosInstance.delete(`/task/delete/${id}`);
            setTasks(tasks.filter((task) => task._id !== id));
            toast.success('Task deleted successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete task');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const TaskCard = ({ task }) => (
        <Card key={task._id}>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    {task.title}
                    <span
                        className={`text-sm ${
                            task.status === 'completed'
                                ? 'text-green-500'
                                : 'text-yellow-500'
                        }`}
                    >
                        {task.status || 'pending'}
                    </span>
                </CardTitle>
                {task.discription && ( // ✅ show description if available
                    <CardDescription>{task.discription}</CardDescription>
                )}
            </CardHeader>
            <CardFooter>
                <div className="flex gap-2">
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteTask(task._id)}
                    >
                        Delete
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Task Manager
                    </h1>
                    <p className="text-gray-600">
                        Organize your tasks efficiently
                    </p>
                </div>

                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="all">All Tasks</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>

                    <div className="mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Add New Task</CardTitle>
                                <CardDescription>
                                    Enter your task details below
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-4">
                                    <Input
                                        placeholder="Enter task title"
                                        value={newTitle}
                                        onChange={(e) =>
                                            setNewTitle(e.target.value)
                                        }
                                        onKeyPress={(e) =>
                                            e.key === 'Enter' && addTask()
                                        }
                                    />
                                    <Textarea
                                        placeholder="Enter task description"
                                        value={newDescription}
                                        onChange={(e) =>
                                            setNewDescription(e.target.value)
                                        }
                                        onKeyPress={(e) =>
                                            e.key === 'Enter' && addTask()
                                        }
                                    />
                                    <Button onClick={addTask}>Add Task</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {loading ? (
                        <div className="mt-4 text-center">Loading tasks...</div>
                    ) : (
                        <>
                            <TabsContent value="all">
                                <div className="mt-4 grid gap-4">
                                    {tasks.map((task) => (
                                        <TaskCard key={task._id} task={task} />
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="pending">
                                <div className="mt-4 grid gap-4">
                                    {tasks
                                        .filter(
                                            (task) => task.status === 'pending',
                                        )
                                        .map((task) => (
                                            <TaskCard
                                                key={task._id}
                                                task={task}
                                            />
                                        ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="completed">
                                <div className="mt-4 grid gap-4">
                                    {tasks
                                        .filter(
                                            (task) =>
                                                task.status === 'completed',
                                        )
                                        .map((task) => (
                                            <TaskCard
                                                key={task._id}
                                                task={task}
                                            />
                                        ))}
                                </div>
                            </TabsContent>
                        </>
                    )}
                </Tabs>
            </div>

            <Toaster position="top-right" richColors />
        </div>
    );
}

export default App;
