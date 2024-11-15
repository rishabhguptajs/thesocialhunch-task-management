import React from 'react';
import { Button, ListGroup, Container } from 'react-bootstrap';
import axios from 'axios';

const TaskList = ({ tasks, setTasks }) => {
  const SERVER_URL = 'http://localhost:8080/api/tasks';

  const fetchTasks = async () => {
    try {
      const response = await axios.get(SERVER_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`${SERVER_URL}/${tasks[index]._id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = async (index) => {
    const taskToEdit = tasks[index];
    const updatedTitle = prompt("Edit task title:", taskToEdit.title);
    const updatedDescription = prompt("Edit task description:", taskToEdit.description);

    if (updatedTitle && updatedDescription) {
      try {
        await axios.put(`${SERVER_URL}/${taskToEdit._id}`, {
          title: updatedTitle,
          description: updatedDescription,
        });
        fetchTasks(); // Refetch tasks after updating
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  // Ensure tasks is an array before mapping
  const taskList = Array.isArray(tasks) ? tasks : [];

  return (
    <Container 
      className="mt-4 p-4" 
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '15px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
        border: '1px solid #dee2e6',
        transition: 'all 0.3s ease',
        overflowY: 'auto', 
        maxHeight: '600px',
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <h2 className="text-center mb-4" style={{ color: '#2c3e50', fontWeight: 'bold', fontSize: '2rem' }}>Task List</h2>
      {taskList.length === 0 ? (
        <p className="text-center" style={{ color: '#7f8c8d', fontStyle: 'italic', fontSize: '1.1rem' }}>No tasks available</p>
      ) : (
        <ListGroup>
          {taskList.map((task, index) => (
            <ListGroup.Item 
              key={index} 
              className="d-flex justify-content-between align-items-center mb-3" 
              style={{ 
                border: '1px solid #e2e8f0', 
                borderRadius: '12px', 
                padding: '15px',
                transition: 'all 0.2s ease',
                backgroundColor: '#f8f9fa'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
            >
              <div>
                <h5 style={{ color: '#34495e', fontWeight: '600' }}>{task.title}</h5>
                <p style={{ color: '#7f8c8d' }}>{task.description}</p>
              </div>
              <div>
                <Button 
                  variant="warning" 
                  onClick={() => handleEdit(index)} 
                  style={{ marginRight: '10px', padding: '10px 20px', borderRadius: '6px', fontWeight: '500', transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f39c12'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                >
                  Edit
                </Button>
                <Button 
                  variant="danger" 
                  onClick={() => handleDelete(index)}
                  style={{ padding: '10px 20px', borderRadius: '6px', fontWeight: '500', transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e74c3c'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                >
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default TaskList;
