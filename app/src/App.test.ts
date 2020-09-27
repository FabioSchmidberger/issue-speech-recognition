import React from 'react';
import { render } from '@testing-library/react';
import SpeechProcessing from './useSpeech';

test('Renders the start recording button', () => {
  const { getByText } = render(<SpeechProcessing />);
  const startButton = getByText(/Start Recording/);
  expect(startButton).toBeInTheDocument();
});

test('Renders the stop recording button', () => {
  const { getByText } = render(<SpeechProcessing />);
  const stopButton = getByText(/Stop Recording/);
  expect(stopButton).toBeInTheDocument();
});
