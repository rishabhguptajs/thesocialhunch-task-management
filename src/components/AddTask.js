import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

const AddTask = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const SERVER_URL = 'http://localhost:8080/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER_URL}/tasks`, {
        title,
        description,
      });
      setTitle('');
      setDescription('');
      onClose();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <Container 
      className="p-4" 
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '15px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        border: '1px solid #dee2e6'
      }}
    >
      <h2 className="text-center mb-4" style={{ color: '#2c3e50', fontSize: '1.8rem', fontWeight: 'bold' }}>Add New Task</h2>
      <Form onSubmit={handleSubmit} className="p-3">
        <Form.Group controlId="formTitle" className="mb-4">
          <Form.Label style={{ fontWeight: '600', color: '#34495e' }}>Title</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter task title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #e2e8f0',
              transition: 'border-color 0.2s ease'
            }}
          />
        </Form.Group>

        <Form.Group controlId="formDescription" className="mb-4">
          <Form.Label style={{ fontWeight: '600', color: '#34495e' }}>Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={4} 
            placeholder="Enter task description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #e2e8f0',
              resize: 'vertical',
              minHeight: '120px',
              transition: 'border-color 0.2s ease'
            }}
          />
        </Form.Group>

        <div className="d-flex justify-content-between mt-4">
          <Button 
            variant="secondary" 
            onClick={onClose}
            style={{
              padding: '12px 25px',
              borderRadius: '8px',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            type="submit"
            style={{
              padding: '12px 35px',
              borderRadius: '8px',
              fontWeight: '600',
              backgroundColor: '#3498db',
              border: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
          >
            Add Task
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddTask;