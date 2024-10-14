"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    setDisplay(display.charAt(0) === '-' ? display.substr(1) : '-' + display);
  };

  const inputPercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentValue = prevValue || 0;
      const newValue = calculate(currentValue, inputValue, operator);

      setPrevValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (prevValue: number, nextValue: number, op: string) => {
    switch (op) {
      case '+':
        return prevValue + nextValue;
      case '-':
        return prevValue - nextValue;
      case '×':
        return prevValue * nextValue;
      case '÷':
        return prevValue / nextValue;
      default:
        return nextValue;
    }
  };

  const handleEquals = () => {
    if (!prevValue || !operator) return;

    const inputValue = parseFloat(display);
    const result = calculate(prevValue, inputValue, operator);

    setDisplay(String(result));
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const buttons = [
    { label: 'AC', action: clear, className: 'col-span-2 bg-gray-300 text-black' },
    { label: '%', action: inputPercent, className: 'bg-gray-300 text-black' },
    { label: '÷', action: () => performOperation('÷'), className: 'bg-orange-500 text-white' },
    { label: '7', action: () => inputDigit('7') },
    { label: '8', action: () => inputDigit('8') },
    { label: '9', action: () => inputDigit('9') },
    { label: '×', action: () => performOperation('×'), className: 'bg-orange-500 text-white' },
    { label: '4', action: () => inputDigit('4') },
    { label: '5', action: () => inputDigit('5') },
    { label: '6', action: () => inputDigit('6') },
    { label: '-', action: () => performOperation('-'), className: 'bg-orange-500 text-white' },
    { label: '1', action: () => inputDigit('1') },
    { label: '2', action: () => inputDigit('2') },
    { label: '3', action: () => inputDigit('3') },
    { label: '+', action: () => performOperation('+'), className: 'bg-orange-500 text-white' },
    { label: '0', action: () => inputDigit('0'), className: 'col-span-2' },
    { label: '.', action: inputDecimal },
    { label: '=', action: handleEquals, className: 'bg-orange-500 text-white' },
  ];

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
      <Input
        className="w-full text-right text-3xl font-bold mb-4 bg-gray-100"
        value={display}
        readOnly
      />
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((button, index) => (
          <Button
            key={index}
            onClick={button.action}
            className={cn(
              'h-16 text-xl font-semibold',
              button.className,
              !button.className && 'bg-gray-200 text-black'
            )}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;