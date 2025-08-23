import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LandingForm from '../components/LandingForm';
describe('LandingForm', () => {
  it('renders title', () => {
    render(<LandingForm lang="en" />);
    expect(screen.getByText(/Leave your details/i)).toBeTruthy();
  });
});
