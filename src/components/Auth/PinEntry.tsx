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

  useEffect(() => {
    const firstInput = document.querySelector('#pin-0') as HTMLInputElement;
    firstInput?.focus();

    const preventFocusLoss = (e: MouseEvent) => {
      e.preventDefault();
      const currentFocusedInput = document.activeElement;
      if (!currentFocusedInput?.id?.startsWith('pin-')) {
        const lastFilledIndex = pin.indexOf('');
        const targetInput = document.querySelector(
          `#pin-${lastFilledIndex === -1 ? 3 : Math.max(0, lastFilledIndex)}`
        ) as HTMLInputElement;
        targetInput?.focus();
      }
    };

    document.addEventListener('mousedown', preventFocusLoss);
    document.addEventListener('click', preventFocusLoss);

    return () => {
      document.removeEventListener('mousedown', preventFocusLoss);
      document.removeEventListener('click', preventFocusLoss);
    };
  }, [pin]);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('chatAuth');
    if (isAuthenticated === 'true') {
      onSuccess();
    }
  }, [onSuccess]);

  const clearPin = () => {
    setPin(['', '', '', '']);
    const firstInput = document.querySelector('#pin-0') as HTMLInputElement;
    firstInput?.focus();
  };

  const handlePinChange = (index: number, value: string) => {
    const digit = value.slice(-1);
    if (!/^\d*$/.test(digit)) return;

    setError(false);
    const newPin = [...pin];
    newPin[index] = digit;
    setPin(newPin);

    if (digit && index < 3) {
      setTimeout(() => {
        const nextInput = document.querySelector(`#pin-${index + 1}`) as HTMLInputElement;
        nextInput?.focus();
      }, 0);
    }

    if (index === 3 && digit) {
      const enteredPin = [...newPin.slice(0, 3), digit].join('');
      if (enteredPin === correctPin) {
        setSuccess(true);
        setTimeout(() => {
          sessionStorage.setItem('chatAuth', 'true');
          onSuccess();
        }, 300);
      } else {
        setError(true);
        clearPin();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
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