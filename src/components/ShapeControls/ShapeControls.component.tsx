import { Box, Paper, TextField, Typography } from "@mui/material";
import { ShapeDimensions, ShapePosition } from "../../model";
import styles from './ShapeControls.module.css';

interface ShapeControlsProps {
    name: string | null;
    position: ShapePosition;
    dimensions: ShapeDimensions;
    handlePositionChange(axis: 'x' | 'y' | 'z', value: number): void;
    handleDimensionsChange(axis: 'width' | 'height' | 'depth' | 'radius', value: number): void;
}

const ShapeControls: React.FC<ShapeControlsProps> = ({ name, position, dimensions, handlePositionChange, handleDimensionsChange }) => {

    return (
        <Paper className={styles.controlsContainer}>
            <Typography variant="h6" color="red">{name}</Typography>
            <Typography variant="subtitle1">Position:</Typography>
            <Box className={styles.row}>
                <TextField
                    label="X"
                    type="number"
                    value={position.x}
                    onChange={(e) => handlePositionChange('x', parseFloat(e.target.value))}
                />
                <TextField
                    label="Y"
                    type="number"
                    value={position.y}
                    onChange={(e) => handlePositionChange('y', parseFloat(e.target.value))}
                />
                <TextField
                    label="Z"
                    type="number"
                    value={position.z}
                    onChange={(e) => handlePositionChange('z', parseFloat(e.target.value))}
                />
            </Box>

            <Typography variant="subtitle1">Dimensions:</Typography>
            <Box className={styles.row}>
                {dimensions.width && <TextField
                    label="Width"
                    type="number"
                    value={dimensions.width}
                    onChange={(e) => handleDimensionsChange('width', parseFloat(e.target.value))}
                />}
                {dimensions.height && <TextField
                    label="Height"
                    type="number"
                    value={dimensions.height}
                    onChange={(e) => handleDimensionsChange('height', parseFloat(e.target.value))}
                />}
                {dimensions.depth && <TextField
                    label="Depth"
                    type="number"
                    value={dimensions.depth}
                    onChange={(e) => handleDimensionsChange('depth', parseFloat(e.target.value))}
                />}
                {dimensions.radius && <TextField
                    label="Radius"
                    type="number"
                    value={dimensions.radius}
                    onChange={(e) => handleDimensionsChange('radius', parseFloat(e.target.value))}
                />}
            </Box>
        </Paper>
    )
}

export default ShapeControls;