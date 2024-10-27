import React, { useState } from 'react';
import { Modal, Box, Button, TextField, MenuItem, Typography, Select } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { Shape, ShapeType } from '../../model';
import { getDefaultShapeDimensions } from '../../utils';
import styles from './ShapeModal.module.css'

export interface ShapeModalProps {
    onSave: (shape: Omit<Shape, 'id'>) => void;
}

const ShapeModal: React.FC<ShapeModalProps> = ({ onSave }) => {
    const [open, setOpen] = useState(false);
    const [shapeData, setShapeData] = useState<Partial<Omit<Shape, 'id'>> | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const handleSave = () => {
        setSubmitted(true);

        if (shapeData?.name && shapeData.type) {
            const dimensions = getDefaultShapeDimensions(shapeData.type)
            const newShape: Omit<Shape, 'id'> = {
                type: shapeData.type,
                name: shapeData.name,
                dimensions
            }

            onSave(newShape);
            setOpen(false);
        }
    };

    return (
        <>
            <Button variant="contained" endIcon={<AddRoundedIcon />} onClick={() => setOpen(true)}>Create</Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box className={styles.container}>
                    <Typography variant="h4" component="h4" textAlign={'center'}>
                        Create
                    </Typography>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={shapeData?.name}
                        onChange={(e) => setShapeData({ ...shapeData, name: e.target.value })}
                        className={styles.field}
                        error={submitted && !shapeData?.name}
                    />
                    <Select
                        className={styles.field}
                        name="type"
                        fullWidth
                        displayEmpty
                        value={shapeData?.type || ''}
                        onChange={(e) => setShapeData({ ...shapeData, type: e.target.value as ShapeType })}
                        error={submitted && !shapeData?.type}
                    >
                        <MenuItem value="" disabled>Select a shape</MenuItem>
                        <MenuItem value="cube">Cube</MenuItem>
                        <MenuItem value="sphere">Sphere</MenuItem>
                        <MenuItem value="cylinder">Cylinder</MenuItem>
                        <MenuItem value="cone">Cone</MenuItem>
                    </Select>

                    {/* action buttons */}
                    <Box className={styles.buttonsContainer}>
                        <Button variant="contained" onClick={handleSave}>Create</Button>
                        <Button variant="outlined" color="error" onClick={() => setOpen(false)}>Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default ShapeModal;
