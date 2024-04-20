import React from 'react'
import { Button, ButtonProps } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useProcessing } from '@/hooks/useIsProcessing';

type Props = {
  doProcessing: (payload?: any) => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const ProcessingButton = ({className, variant, doProcessing, children, disabled}: Props & ButtonProps) => {
  const { isProcessing, startProcessing } = useProcessing(false);

  const handleSave = () => {
    startProcessing(async () => {
      await doProcessing();
    });
  };

  return (
    <Button className={`w-[140px] ${className}`} variant={variant} onClick={handleSave} disabled={isProcessing || disabled}>
      {isProcessing || disabled ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          <p>Please wait...</p>
        </>
      ) : (
        <>
          {children}
        </>
      )}
    </Button>
  )
}

export default ProcessingButton