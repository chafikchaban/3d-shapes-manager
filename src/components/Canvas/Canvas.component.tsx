import React, { useEffect, useRef, useState } from 'react';
import {
    Mesh,
    Scene,
    WebGLRenderer,
    Raycaster,
    Vector2,
    PerspectiveCamera,
    BufferGeometry,
    BoxGeometry,
    SphereGeometry,
    CylinderGeometry,
    ConeGeometry,
    MeshStandardMaterial,
    HemisphereLight

} from 'three';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { Shape, ShapeDimensions, ShapePosition } from '../../model';
import ShapeControls from '../ShapeControls/ShapeControls.component';
import { getMeshDimensions } from '../../utils';
import styles from './Canvas.module.css';

interface CanvasProps {
    shapes: Shape[];
    onClose: () => void;
}

const Canvas: React.FC<CanvasProps> = ({ shapes, onClose }) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [selectedObject, setSelectedObject] = useState<Mesh | null>(null);
    const [position, setPosition] = useState<ShapePosition>({ x: 0, y: 0, z: 0 });
    const [dimensions, setDimensions] = useState<Partial<ShapeDimensions>>({});
    const [selectedName, setSelectedName] = useState<string | null>(null);

    useEffect(() => {
        const currentCanvasRef = canvasRef.current;
        const scene = new Scene();
        const renderer = new WebGLRenderer({ antialias: true });
        const raycaster = new Raycaster();
        const mouse = new Vector2();

        // camera
        const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (currentCanvasRef) {
            currentCanvasRef.appendChild(renderer.domElement);
        }

        const meshObjects: Mesh[] = shapes.map((shape, index) => {
            let geometry: BufferGeometry;
            switch (shape.type) {
                case 'cube':
                    geometry = new BoxGeometry(shape.dimensions.width, shape.dimensions.height, shape.dimensions.depth);
                    break;
                case 'sphere':
                    geometry = new SphereGeometry(shape.dimensions.radius, 32, 32);
                    break;
                case 'cylinder':
                    geometry = new CylinderGeometry(shape.dimensions.radius, shape.dimensions.radius, shape.dimensions.height, 32);
                    break;
                case 'cone':
                    geometry = new ConeGeometry(shape.dimensions.radius, shape.dimensions.height, 32);
                    break;
                default:
                    geometry = new BoxGeometry(shape.dimensions.width, shape.dimensions.height, shape.dimensions.depth);
            }

            const material = new MeshStandardMaterial({
                color: 0xffffff,
                flatShading: true,
            });
            const mesh = new Mesh(geometry, material);
            mesh.position.set(index * 15, 0, 0);
            scene.add(mesh);
            return mesh;
        });

        // Add lights
        const light = new HemisphereLight(0xffffff, 0x080808, 4.5);
        light.position.set(-1.25, 1, -1.25);
        scene.add(light);

        const controls = new OrbitControls(camera, renderer.domElement);

        // Handle mouse click for shape selection
        const handleMouseClick = (event: MouseEvent) => {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);

            // Check for intersections
            const intersects = raycaster.intersectObjects(meshObjects);
            if (intersects.length > 0) {
                const selectedMesh = intersects[0].object as Mesh;
                setSelectedObject(selectedMesh);
                setSelectedName(shapes[meshObjects.indexOf(selectedMesh)].name);
                const { x, y, z } = selectedMesh.position;
                setPosition({ x, y, z });

                // Set dimensions based on selected shape's bounding box
                const meshDimensions = getMeshDimensions(selectedMesh);
                setDimensions(meshDimensions);
            }
        };

        renderer.domElement.addEventListener('click', handleMouseClick);

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            if (currentCanvasRef) {
                currentCanvasRef.removeChild(renderer.domElement);
                controls.dispose();
                renderer.domElement.removeEventListener('click', handleMouseClick);
            }
        };
    }, [shapes]);

    // Update position of selected shape
    const handlePositionChange = (axis: 'x' | 'y' | 'z', value: number) => {
        if (selectedObject) {
            selectedObject.position[axis] = value;
            setPosition(prev => ({ ...prev, [axis]: value }));
        }
    };

    // Update dimensions of selected shape
    const handleDimensionsChange = (axis: 'width' | 'height' | 'depth' | 'radius', value: number) => {
        if (selectedObject) {
            let newGeometry: BufferGeometry;

            // Check the type of geometry and update accordingly
            switch (selectedObject.geometry.type) {
                case 'BoxGeometry':
                    newGeometry = new BoxGeometry(
                        axis === 'width' ? value : dimensions.width,
                        axis === 'height' ? value : dimensions.height,
                        axis === 'depth' ? value : dimensions.depth
                    );
                    break;

                case 'SphereGeometry':
                    newGeometry = new SphereGeometry(
                        axis === 'radius' ? value : dimensions.radius,
                        32,
                        32
                    );
                    break;

                case 'CylinderGeometry':
                    newGeometry = new CylinderGeometry(
                        axis === 'radius' ? value : dimensions.radius,
                        axis === 'radius' ? value : dimensions.radius,
                        axis === 'height' ? value : dimensions.height,
                        32
                    );
                    break;

                case 'ConeGeometry':
                    newGeometry = new ConeGeometry(
                        axis === 'radius' ? value : dimensions.radius,
                        axis === 'height' ? value : dimensions.height,
                        32
                    );
                    break;

                default:
                    console.error("Unsupported geometry type:", selectedObject.geometry.type);
                    return;
            }

            // Remove of the old geometry and apply the new one
            selectedObject.geometry.dispose();
            selectedObject.geometry = newGeometry;

            // Update the dimensions state
            setDimensions((prev) => ({ ...prev, [axis]: value }));
        }
    };

    return (
        <div className={styles.container}>
            <IconButton aria-label="close" className={styles.closeIcon} onClick={onClose}>
                <CloseIcon />
            </IconButton>
            {selectedObject && position && (
                <ShapeControls
                    name={selectedName}
                    position={position}
                    dimensions={dimensions}
                    handleDimensionsChange={handleDimensionsChange}
                    handlePositionChange={handlePositionChange}
                />
            )}
            <div style={{ width: '100%', position: 'absolute', top: 0, left: 0 }} ref={canvasRef} />
        </div>
    );
};

export default Canvas;
