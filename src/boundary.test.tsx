import { describe, it,vi, expect, test  } from 'vitest'
import { render, cleanup,fireEvent, getByText } from '@testing-library/react'
import Home from './app/page'
import React, {useState,useEffect} from 'react';

const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><p>hello world</p>');
global.window = dom.window;
global.document = dom.window.document;


test('Home', async () => {
  const { findByText } = render(<Home />)
  const movesElement = await findByText(/Moves : 0/i);
  const scoreElement = await findByText(/Score : 0/i);

  expect(movesElement === undefined).toBe(false)
  expect(scoreElement === undefined).toBe(false)
  cleanup()
})


describe('Home Component', () => {
  it('should log the correct configuration when buttons are clicked', () => {
    // Spy on console.log
    const logSpy = vi.spyOn(console, 'log');

    // Render the Home component
    const { getByText } = render(<Home />);

    // Simulate clicking the button for Config 1
    fireEvent.click(getByText('Configuration 1'));
    expect(logSpy).toHaveBeenCalledWith('This is configuration 1');

    // Simulate clicking the button for Config 2
    fireEvent.click(getByText('Configuration 2'));
    expect(logSpy).toHaveBeenCalledWith('This is configuration 2');

    // Simulate clicking the button for Config 3
    fireEvent.click(getByText('Configuration 3'));
    expect(logSpy).toHaveBeenCalledWith('This is configuration 3');
  });
});


test('Access GUI', async() => {
const { findByText } = render(<Home />);
const SwapButton = findByText('Swap')
const UndoButton = findByText('Undo')
expect(SwapButton.disabled).toBeFalsy()
expect(UndoButton.disabled).toBeFalsy()
cleanup()
})

