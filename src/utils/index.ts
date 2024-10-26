import { Mesh } from 'three';
import { ShapeType } from "../model";

export const getDefaultShapeDimensions = (type: ShapeType) => {
    switch (type) {
        case 'cube':
            return { height: 2, width: 2, depth: 2 };

        case 'sphere':
            return { radius: 2 };

        case 'cylinder':
        case 'cone':
            return { height: 2, radius: 2 };

        default:
            return { width: 0, height: 0, depth: 0, radius: 0 };
    }
}

export const getMeshDimensions = (mesh: Mesh) => {
    mesh.geometry.computeBoundingBox();

    // Access the bounding box of the item 
    const boundingBox = mesh.geometry.boundingBox;

    if (boundingBox) {
        // calculate item's dimensions
        const width = boundingBox.max.x - boundingBox.min.x;
        const height = boundingBox.max.y - boundingBox.min.y;
        const depth = boundingBox.max.z - boundingBox.min.z;

        // Based on the type of geometry, return the relevant dimensions
        switch (mesh.geometry.type) {
            case 'BoxGeometry':
                return { width, height, depth };

            case 'SphereGeometry':
                return { radius: width / 2 };

            case 'CylinderGeometry':
            case 'ConeGeometry':
                return { height, radius: width / 2 };

            default:
                return { width: 0, height: 0, depth: 0, radius: 0 };
        }
    }

    // Default fallback in case the bounding box doesn't exist or for unhandled geometries
    return { width: 0, height: 0, depth: 0, radius: 0 };
};
