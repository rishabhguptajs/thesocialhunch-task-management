import './App.css';
import React, { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import { Button, Container, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [showAlert, setShowAlert] = useState(true); // State for alert visibility
  const SERVER_URL = 'http://localhost:8080/api/tasks';

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(SERVER_URL);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTaskClick = () => {
    setShowAddTask(true);
  };

  const handleClose = () => {
    setShowAddTask(false);
    const fetchTasks = async () => {
      try {
        const response = await axios.get(SERVER_URL);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post(SERVER_URL, task);
      setTasks([...tasks, response.data]);
      handleClose();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <Container 
      className="mt-5 p-4" 
      style={{
        maxWidth: '800px',
        backgroundColor: '#f8f9fa',
        borderRadius: '15px',
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
        border: '1px solid #dee2e6',
        margin: '2rem auto',
        padding: '2rem'
      }}
    >
      {showAlert && (
        <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>Notice</Alert.Heading>
          <p>
            Please note that there might be a 50s downtime while interacting with the backend in the free trial of render.
          </p>
        </Alert>
      )}
      <h2 className="text-center mb-4" style={{ color: '#2c3e50', fontSize: '2.5rem', fontWeight: 'bold' }}>Task Management</h2>
      <Button 
        variant="primary" 
        onClick={handleAddTaskClick}
        style={{
          padding: '12px 35px',
          borderRadius: '8px',
          fontWeight: '600',
          backgroundColor: '#3498db',
          border: 'none',
          marginBottom: '2rem',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
      >
        Add Task
      </Button>

      <Modal show={showAddTask} onHide={handleClose}>
        <Modal.Body>
          <AddTask onClose={handleClose} addTask={addTask} />
        </Modal.Body>
      </Modal>

      <TaskList tasks={tasks} setTasks={setTasks} />
    </Container>
  );
}

export default App;
