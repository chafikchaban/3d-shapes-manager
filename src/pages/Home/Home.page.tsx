import { useState } from 'react';
import './Home.css'
import { Shape } from '../../model';
import { initialShapes } from '../../utils';
import ShapeTable from '../../components/ShapeTable/ShapeTable.component';
import Canvas from '../../components/Canvas/Canvas.component';


export const HomePage: React.FC = () => {
    const [shapes, setShapes] = useState<Shape[]>(initialShapes);
    const [renderShapes, setRenderShapes] = useState<Shape[] | null>(null);

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