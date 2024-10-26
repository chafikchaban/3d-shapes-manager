import React, { useState } from 'react';
import { Modal, Box, Button, TextField, MenuItem, Typography, Select } from '@mui/material';
import { Shape, ShapeType } from '../../model';
import './ShapeModal.css'
import { getDefaultShapeDimensions } from '../../utils';

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
            <Button variant="contained" onClick={() => setOpen(true)}>Create</Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box className={'container'}>
                    <Typography variant="h4" component="h4" textAlign={'center'}>
                        Create
                    </Typography>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={shapeData?.name}
                        onChange={(e) => setShapeData({ ...shapeData, name: e.target.value })}
                        className='field'
                        error={submitted && !shapeData?.name}
                    />
                    <Select
                        className='field'
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
                    <Box className={'buttons-container'}>
                        <Button variant="contained" onClick={handleSave}>Create</Button>
                        <Button variant="contained" onClick={() => setOpen(false)}>Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default ShapeModal;
