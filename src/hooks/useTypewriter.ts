'use client';

import { useState, useEffect, useRef } from 'react';

export function useTypewriter(text: string, speed = 20, onComplete?: () => void) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let i = 0;
    setDisplayText('');
    setIsComplete(false);

    const type = () => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
        timeoutRef.current = setTimeout(type, speed);
      } else {
        setIsComplete(true);
        onComplete?.();
      }
    };

    type();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, onComplete]);

  return { displayText, isComplete };
}
