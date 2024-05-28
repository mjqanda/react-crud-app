// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TableComponent from '../components/TableComponent';
import { Container, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } from '../api/ApiService';

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState({ id: '', name: '', dob: '', department: '', salary: '' });

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = async () => {
    try {
      const response = await getAllEmployees();
      setData(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleOpen = (row = { id: '', name: '', dob: '', department: '', salary: '' }) => {
    setCurrentRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentRow({ id: '', name: '', dob: '', department: '', salary: '' });
  };

  const handleSave = async () => {
    try {
      if (currentRow.id) {
        await updateEmployee(currentRow.id, currentRow);
      } else {
        await createEmployee(currentRow);
      }
      fetchAllEmployees();
      handleClose();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      fetchAllEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleLogout = () => {
    localStorage.setItem('token', ''); // Replace 'token' with the actual key name if different
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem'
      }}
    >
      <Typography variant="h4" gutterBottom>Employee List</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>Add New</Button>
      <TableComponent data={data} onEdit={handleOpen} onDelete={handleDelete} />
      <Link to="/" onClick={handleLogout}>Go to Login Page</Link>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentRow.id ? 'Edit Row' : 'Add New Row'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={currentRow.name}
            onChange={(e) => setCurrentRow({ ...currentRow, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Date of Birth"
            fullWidth
            value={currentRow.dob}
            onChange={(e) => setCurrentRow({ ...currentRow, dob: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Department"
            fullWidth
            value={currentRow.department}
            onChange={(e) => setCurrentRow({ ...currentRow, department: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Salary"
            fullWidth
            value={currentRow.salary}
            onChange={(e) => setCurrentRow({ ...currentRow, salary: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>{currentRow.id ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DashboardPage;
