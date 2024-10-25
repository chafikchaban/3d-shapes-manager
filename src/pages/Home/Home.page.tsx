import { useState } from 'react';
import './Home.css'
import { Shape } from '../../model';
import { initialShapes } from '../../utils';
import ShapeTable from '../../components/ShapeTable/ShapeTable.component';


export const HomePage: React.FC = () => {
    const [shapes, setShapes] = useState<Shape[]>(initialShapes);

    const handleSaveShape = (shape: Omit<Shape, 'id'>) => {
        const newShape: Shape = {
            id: shapes.length,
            ...shape
        }
        setShapes((prevShapes) => [...prevShapes, newShape]);
    };

    const handleDeleteShape = (id: number) => {
        setShapes((prevShapes) => prevShapes.filter((shape) => shape.id !== id));
    };

    return (
        <ShapeTable
            shapes={shapes}
            onSave={handleSaveShape}
            onDeleteShape={handleDeleteShape}
        />
    )
}

export default HomePage;