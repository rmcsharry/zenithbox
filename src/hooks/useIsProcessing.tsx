import { useState } from 'react';

export const useProcessing = (initialState: boolean = false) => {
  const [isProcessing, setIsProcessing] = useState(initialState);

  const startProcessing = async (callback: () => void) => {
    setIsProcessing(true);
    await callback();
    setIsProcessing(false);
  };

  return { isProcessing, startProcessing };
};