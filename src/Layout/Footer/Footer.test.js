import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { BrowserRouter } from "react-router-dom";

test('render Footer elements', () => {
    render(
        <BrowserRouter>
            <Footer />
        </BrowserRouter>
    );

    expect(screen.getByText(/Pikabook/)).toBeInTheDocument();
    expect(screen.getByText('Visit Github for more information.')).toBeInTheDocument();
  });