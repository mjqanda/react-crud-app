// src/components/TableComponent.js
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TableSortLabel } from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const TableComponent = ({ data, onEdit, onDelete }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prevState) => ({
      key,
      direction: prevState.key === key && prevState.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const exportToPdf = () => {
    const input = document.getElementById('table-to-pdf');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('table.pdf');
    });
  };

  return (
    <div>
      <Button onClick={exportToPdf} variant="contained" color="primary" style={{ marginBottom: '10px' }}>
        Export to PDF
      </Button>
      <TableContainer component={Paper} id="table-to-pdf">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'name'}
                  direction={sortConfig.key === 'name' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'dob'}
                  direction={sortConfig.key === 'dob' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('dob')}
                >
                  Date of Birth
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'department'}
                  direction={sortConfig.key === 'department' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('department')}
                >
                  Department
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'salary'}
                  direction={sortConfig.key === 'salary' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('salary')}
                >
                  Salary
                </TableSortLabel>
              </TableCell>
              <TableCell>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row) => (
              <TableRow key={row.id}>
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
    </div>
  );
};

export default TableComponent;
