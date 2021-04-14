import { render, screen } from '@testing-library/react';
import Registration from './Registration';
import { BrowserRouter } from "react-router-dom";

test('render Registration elements', () => {
    render(
        <BrowserRouter>
            <Registration />
        </BrowserRouter>
    );

    expect(screen.getByText("Register")).toBeInTheDocument();
});