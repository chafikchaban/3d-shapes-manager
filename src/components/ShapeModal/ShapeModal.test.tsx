import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ShapeModal from './ShapeModal.component';

// Mock utility function
vi.mock('../../utils', () => ({
  getDefaultShapeDimensions: (type: string) => ({
    width: type === 'cube' ? 1 : undefined,
    height: type === 'cylinder' || type === 'cone' ? 2 : undefined,
    radius: type === 'sphere' || type === 'cylinder' || type === 'cone' ? 3 : undefined,
  }),
}));

describe('ShapeModal Component', () => {
  const onSaveMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the trigger button and modal elements', () => {
    render(<ShapeModal onSave={onSaveMock} />);

    const createButton = screen.getByRole('button', { name: /create/i });
    expect(createButton).toBeTruthy();

    fireEvent.click(createButton);

    // Check if modal title and form fields are rendered
    expect(screen.getByText(/create a shape/i)).toBeTruthy();
    expect(screen.getByLabelText(/name/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeTruthy();
  });

  it('opens the modal when trigger button is clicked and closes when "Cancel" is clicked', () => {
    render(<ShapeModal onSave={onSaveMock} />);

    const createButton = screen.getByRole('button', { name: /create/i });
    fireEvent.click(createButton);

    // Check modal is open
    expect(screen.getByText(/create a shape/i)).toBeTruthy();

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    // Check modal is closed
    expect(screen.queryByText(/create a shape/i)).not.toBeTruthy();
  });

  it('calls onSave with the correct data when valid shape is created', () => {
    render(<ShapeModal onSave={onSaveMock} />);

    fireEvent.click(screen.getByRole('button', { name: /create/i }));

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'MyCube' } });
    fireEvent.mouseDown(screen.getByText(/select a shape/i)); // Open the Select dropdown
    fireEvent.click(screen.getByText(/cube/i)); // Choose Cube

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /create/i }));

    // Verify onSave is called with the correct shape data
    expect(onSaveMock).toHaveBeenCalledWith({
      name: 'MyCube',
      type: 'cube',
      dimensions: {
        width: 1,
        height: undefined,
        radius: undefined,
      },
    });

    // Modal should close after saving
    expect(screen.queryByText(/create a shape/i)).not.toBeTruthy();
  });

  it('closes the modal when "Cancel" button is clicked', () => {
    render(<ShapeModal onSave={onSaveMock} />);

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /create/i }));

    // Cancel the action
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

    // Modal should close
    expect(screen.queryByText(/create a shape/i)).not.toBeTruthy();
  });
});
