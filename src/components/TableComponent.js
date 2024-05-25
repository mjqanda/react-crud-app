// src/components/TableComponent.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const TableComponent = ({ data, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {/* <TableCell>ID</TableCell> */}
            <TableCell>Name</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {/* <TableCell>{row.id}</TableCell> */}
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.dob}</TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>{row.salary}</TableCell>
              <TableCell>
                <Button onClick={() => onEdit(row)}>Edit</Button>
                <Button onClick={() => onDelete(row.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
