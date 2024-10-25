import React, { useCallback } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TableContainer, Paper, Box } from '@mui/material';
import { Shape } from '../../model';
import ShapeModal, { ShapeModalProps } from '../ShapeModal/ShapeModal.component';
import './ShapeTable.css'

interface ShapeTableProps extends ShapeModalProps{
  shapes: Shape[];
  onDeleteShape: (id: number) => void;
  onRender: (shapes: Shape[]) => void;
  onRenderSingle: (shape: Shape) => void;
}

const ShapeTable: React.FC<ShapeTableProps> = ({ shapes, onSave, onDeleteShape, onRender, onRenderSingle  }) => {

  const renderData = useCallback(() => (
    <TableBody>
      {shapes.map(shape => (
        <TableRow key={shape.name}>
          <TableCell align='center'>{shape.id}</TableCell>
          <TableCell align='center'>{shape.name}</TableCell>
          <TableCell align='center'>{shape.type}</TableCell>
          <TableCell className='action-buttons-container'>
            <Button variant="outlined" color="error" onClick={() => onDeleteShape(shape.id)}>
              Delete
            </Button>
            <Button variant="contained" onClick={() => onRenderSingle(shape)}>
              Render
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  ), [onDeleteShape, onRenderSingle, shapes])

  return (
    <div className='table-container'>
      <Box className={'header-container'}>
        <ShapeModal onSave={onSave} />
        <Button variant="contained" onClick={() => onRender(shapes)}>
          Render
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table className='table' aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center'>ID</TableCell>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Type</TableCell>
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          {renderData()}
        </Table>
      </TableContainer>
    </div>
  );
};

export default ShapeTable;
