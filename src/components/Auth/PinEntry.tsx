'use client';

import React, { useState, useEffect } from 'react';

interface PinEntryProps {
  onSuccess: () => void;
}

export const PinEntry = ({ onSuccess }: PinEntryProps) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const correctPin = process.env.NEXT_PUBLIC_ACCESS_PIN || '1234';

  // Simplified focus management
  useEffect(() => {
    // Check authentication status first
    const isAuthenticated = sessionStorage.getItem('chatAuth');
    if (isAuthenticated === 'true') {
      onSuccess();
      return;
    }

    // Only focus first input once on initial mount
    const firstInput = document.getElementById('pin-0');
    if (firstInput) {
      (firstInput as HTMLInputElement).focus();
    }
  }, [onSuccess]);

  const clearPin = () => {
    setPin(['', '', '', '']);
    const firstInput = document.getElementById('pin-0');
    if (firstInput) {
      (firstInput as HTMLInputElement).focus();
    }
  };

  const handlePinChange = (index: number, value: string) => {
    const digit = value.slice(-1);
    if (!/^\d*$/.test(digit)) return;

    setError(false);
    const newPin = [...pin];
    newPin[index] = digit;
    setPin(newPin);

    if (digit && index < 3) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }

    if (index === 3 && digit) {
      const enteredPin = [...newPin.slice(0, 3), digit].join('');
      if (enteredPin === correctPin) {
        setSuccess(true);
        sessionStorage.setItem('chatAuth', 'true');
        setTimeout(onSuccess, 300);
      } else {
        setError(true);
        clearPin();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      clearPin();
    }
  };

  return (
    <div style={{ alignItems: 'center', backgroundColor: '#000', display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#333', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', display: 'flex', gap: '12px', padding: '16px' }}>
        {pin.map((digit, index) => (
          <input
            aria-label={`PIN digit ${index + 1}`}
            id={`pin-${index}`}
            inputMode="numeric"
            key={index}
            maxLength={1}
            onChange={(e) => handlePinChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            style={{
              backgroundColor: '#222',
              border: '2px solid',
              borderColor: error ? '#f87171' : success ? '#34d399' : '#555',
              borderRadius: '4px',
              color: error ? '#f87171' : success ? '#34d399' : '#fff',
              fontSize: '1.25rem',
              height: '48px',
              outline: 'none',
              textAlign: 'center',
              transition: 'all 0.2s ease-out',
              width: '48px',
            }}
            type="password"
            value={digit}
          />
        ))}
      </div>
    </div>
  );
};

// Add default export for dynamic importing
export default PinEntry; 