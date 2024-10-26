import { useEffect, useState } from 'react';
import './Home.css'
import { Shape } from '../../model';
import ShapeTable from '../../components/ShapeTable/ShapeTable.component';
import Canvas from '../../components/Canvas/Canvas.component';


export const HomePage: React.FC = () => {
    const [shapes, setShapes] = useState<Shape[]>([]);
    const [renderShapes, setRenderShapes] = useState<Shape[] | null>(null);

    useEffect(() => {
        // get shapes list from localStorage
        const storedShapes = JSON.parse(localStorage.getItem('shapes') || '[]') || [];
        setShapes(storedShapes);
    }, []);

    const handleSaveShape = (shape: Omit<Shape, 'id'>) => {
        const newShape: Shape = {
            id: shapes.length,
            ...shape
        }
        const newShapes = [...shapes, newShape];

        // update shapes list in local state and localStorage
        setShapes(newShapes);
        localStorage.setItem('shapes', JSON.stringify(newShapes));
    };

    const handleDeleteShape = (id: number) => {
        const updatedShapes = shapes.filter((shape) => shape.id !== id);
        setShapes(updatedShapes);
        localStorage.setItem('shapes', JSON.stringify(updatedShapes));
    };

    const handleRenderAll = (shapes: Shape[]) => {
        setRenderShapes(shapes);
    };

    const handleRenderSingle = (shape: Shape) => {
        setRenderShapes([shape]);
    };

    const handleCloseCanvas = () => {
        setRenderShapes(null);
    };

    return (
        <div className='page-container'>
            {renderShapes ? (
                <Canvas shapes={renderShapes} onClose={handleCloseCanvas} />
            ) : (
                <ShapeTable
                    shapes={shapes}
                    onSave={handleSaveShape}
                    onDeleteShape={handleDeleteShape}
                    onRender={handleRenderAll}
                    onRenderSingle={handleRenderSingle}
                />
            )}
        </div>
    )
}

export default HomePage;