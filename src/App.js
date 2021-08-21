import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTaskForm from './components/AddTaskForm'
import About from './components/About'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { useState, useEffect } from 'react'

function App() {
    const [showAddTaskForm, setShowAddTaskForm] = useState(false)
    const [tasks, setTasks] = useState([])

    const server_host = 'http://localhost:5000'

    const fetchTasks = async () => {
        const response = await fetch(`${server_host}/tasks`)
        const data = await response.json()
        return data
    }

    const fetchTask = async (id) => {
        const response = await fetch(`${server_host}/tasks/${id}`)
        const data = await response.json()
        return data
    }

    useEffect(() => {
        const initTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }

        initTasks()
    }, [])


    const addTask = async (task) => {
        const id = Math.floor(Math.random() * 10000) + 1
        const newTask = { id, ...task }

        await fetch(`${server_host}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })

        setTasks([...tasks, newTask])
    }


    const deleteTask = async (id) => {
        await fetch(`${server_host}/tasks/${id}`, { method: 'DELETE' })

        setTasks(tasks.filter((task) => task.id !== id))
    }


    const toggleReminder = async (id) => {
        const task = await fetchTask(id)
        await fetch(`${server_host}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...task, reminder: !task.reminder })
        })

        setTasks(tasks.map((task) => {
            // if it's the task that we clicked
            if (task.id === id) {
                // unpack task object and set property 'reminder' to opposite
                return { ...task, reminder: !task.reminder }
            }
            // and display other tasks without changes
            else {
                return task
            }
        }
        ))
    }


    const toggleAddTaskForm = () => {
        setShowAddTaskForm(!showAddTaskForm)
    }


    return (
        <Router>
            <div className='container'>
                <Header title='Task Tracker' onAdd={() => toggleAddTaskForm()} isAddTaskFormOpen={showAddTaskForm} />
                <Route path='/' exact render={(props) => (
                    <>
                        {showAddTaskForm && <AddTaskForm onAdd={addTask} />}
                        {tasks.length > 0 ?
                            <Tasks
                                tasks={tasks}
                                onDelete={deleteTask}
                                onToggle={toggleReminder}
                            /> :
                            'No tasks for now'}
                    </>
                )} />

                <Route path='/about' component={About} />
                <Footer />
            </div>
        </Router>
    )
}

export default App
