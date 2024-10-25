import React, { useEffect, useRef } from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { Shape } from '../../model';
import './Canvas.css'

interface CanvasProps {
    shapes: Shape[];
    onClose: () => void;
}

const Canvas: React.FC<CanvasProps> = ({ shapes, onClose }) => {
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentCanvasRef = canvasRef.current;
        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        // camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;

        renderer.setSize(window.innerWidth, window.innerHeight);
        if (currentCanvasRef) {
            currentCanvasRef.appendChild(renderer.domElement);
        }

        shapes.forEach((shape, index) => {
            let geometry: THREE.Geometry | THREE.BufferGeometry;
            switch (shape.type) {
                case 'cube':
                    geometry = new THREE.BoxGeometry(2, 2, 2);
                    break;
                case 'sphere':
                    geometry = new THREE.SphereGeometry(2, 32, 16);
                    break;
                case 'cylinder':
                    geometry = new THREE.CylinderGeometry(2, 2, 6, 32);
                    break;
                case 'cone':
                    geometry = new THREE.ConeGeometry(2, 6, 32);
                    break;
                default:
                    geometry = new THREE.BoxGeometry(2, 2, 2);
            }

            const material = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                flatShading: true
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(index * 15, 0, 0);
            scene.add(mesh);
        });

        // Add lights
        const light = new THREE.HemisphereLight(0xffffff, 0x080808, 4.5);
        light.position.set(-1.25, 1, -1.25);
        scene.add(light);

        const controls = new OrbitControls(camera, renderer.domElement);

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
            }
        };
    }, [shapes]);

    return (
        <div style={{ width: '100vw', position: 'relative', top: 0, left: 0 }}>
            <IconButton aria-label="close" className='close-icon' onClick={onClose}>
                <CloseIcon />
            </IconButton>
            <div style={{ width: '100%', position: 'absolute', top: 0, left: 0 }} ref={canvasRef} />
        </div>
    );
};

export default Canvas;
