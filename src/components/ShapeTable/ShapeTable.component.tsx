import React, { useCallback } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TableContainer, Paper, Box, Typography } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { Shape } from '../../model';
import ShapeModal, { ShapeModalProps } from '../ShapeModal/ShapeModal.component';
import styles from './ShapeTable.module.css'

interface ShapeTableProps extends ShapeModalProps {
  shapes: Shape[];
  onDeleteShape: (id: number) => void;
  onRender: (shapes: Shape[]) => void;
  onRenderSingle: (shape: Shape) => void;
}

const ShapeTable: React.FC<ShapeTableProps> = ({ shapes, onSave, onDeleteShape, onRender, onRenderSingle }) => {


  const renderEmptyState = () => {
    return (
      <Paper className={styles.emptyTable}>
        <Typography variant="h6" >No data</Typography>
        <Typography variant="subtitle1">Seems like you have no shapes yet. Start by creating one!</Typography>
      </Paper>
    )
  }

  const renderData = useCallback(() => (
    <TableBody>
      {shapes.map(shape => (
        <TableRow key={shape.name}>
          <TableCell align='center'>{shape.id}</TableCell>
          <TableCell align='center'>{shape.name}</TableCell>
          <TableCell align='center'>{shape.type}</TableCell>
          <TableCell className={styles.actionsContainer}>
            <Button variant="outlined" color="error" endIcon={<DeleteIcon />} onClick={() => onDeleteShape(shape.id)}>
              Delete
            </Button>
            <Button variant="contained" endIcon={<VisibilityTwoToneIcon />} onClick={() => onRenderSingle(shape)}>
              Render
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  ), [onDeleteShape, onRenderSingle, shapes])

  return (
    <div className={styles.container}>
      <Box className={styles.header}>
        <ShapeModal onSave={onSave} />
        <Button variant="contained" disabled={!shapes.length} endIcon={<VisibilityTwoToneIcon />} onClick={() => onRender(shapes)}>
          Render
        </Button>
      </Box>
      {!shapes.length ?
        renderEmptyState() :
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table className={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align='center' className={styles.tableHeaderText}>ID</TableCell>
                <TableCell align='center' className={styles.tableHeaderText}>Name</TableCell>
                <TableCell align='center' className={styles.tableHeaderText}>Type</TableCell>
                <TableCell align='center' className={styles.tableHeaderText}>Action</TableCell>
              </TableRow>
            </TableHead>
            {renderData()}
          </Table>
        </TableContainer>
      }
    </div>
  );
};

export default ShapeTable;
