export interface Shape {
    id: number;
    name: string;
    dimensions: ShapeDimensions;
    type: ShapeType;
}

export type ShapeType =
    | 'cube'
    | 'sphere'
    | 'cylinder'
    | 'cone';

export interface ShapeDimensions {
    height?: number;
    width?: number;
    depth?: number;
    radius?: number
}

export interface ShapePosition {
    x: number;
    y: number;
    z: number
}
