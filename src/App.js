import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTaskForm from './components/AddTaskForm'

import { useState } from 'react'

function App() {
    const [showAddTaskForm, setShowAddTaskForm] = useState(false)
    const [tasks, setTasks] = useState([
        {
            "id": 1,
            "text": "Doctors Appointment",
            "day": "Feb 5th at 2:30pm",
            "reminder": false
        },
        {
            "id": 2,
            "text": "Meeting at School",
            "day": "Feb 6th at 1:30pm",
            "reminder": true
        }
    ]);


    const addTask = (task) => {
        const id = Math.floor(Math.random() * 10000) + 1;
        const newTask = { id, ...task };
        setTasks([...tasks, newTask]);
    }


    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    }


    const toggleReminder = (id) => {
        setTasks(tasks.map((task) => {
            // if it's the task that we clicked
            if (task.id === id) {
                // unpack task object and set property 'reminder' to opposite
                return { ...task, reminder: !task.reminder };
            }
            // and display other tasks without changes
            else {
                return task;
            }
        }
        ))
    }


    const toggleAddTaskForm = () => {
        setShowAddTaskForm(!showAddTaskForm);
    }


    return (
        <div className='container'>
            <Header title='Task Tracker' onAdd={() => toggleAddTaskForm()} isAddTaskFormOpen={showAddTaskForm} />
            {showAddTaskForm && <AddTaskForm onAdd={addTask} />}
            {tasks.length > 0 ?
                <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                /> :
                'No tasks for now'}
        </div>
    );
}

export default App;
