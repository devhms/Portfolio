'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export function useTypewriter(text: string, speed = 20, onComplete?: () => void) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Stabilise onComplete with useCallback ref pattern to prevent restart loops
  // when the caller passes an inline arrow function (new ref on every render).
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  // Wrap stable callback so it never enters the dependency array
  const stableOnComplete = useCallback(() => { onCompleteRef.current?.(); }, []);

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
        stableOnComplete();
      }
    };

    type();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // stableOnComplete is memoised — safe to include without restart risk
  }, [text, speed, stableOnComplete]);

  return { displayText, isComplete };
}
