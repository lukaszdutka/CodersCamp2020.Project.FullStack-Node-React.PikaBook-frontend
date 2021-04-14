import { render, screen, fireEvent } from '@testing-library/react';
import Registration from './Registration';
import { BrowserRouter } from "react-router-dom";

test('render some Registration elements', () => {
    render(
        <BrowserRouter>
            <Registration />
        </BrowserRouter>
    );

    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
});

test('let change input value', () => {
    render(
        <BrowserRouter>
            <Registration />
        </BrowserRouter>
    );
    expect(screen.getByPlaceholderText("Name").textContent).toBe("");
    const input = screen.getByPlaceholderText("Name");
    fireEvent.change(input, { target: { value: '123abc' } });
    expect(input.value).toBe('123abc');
});