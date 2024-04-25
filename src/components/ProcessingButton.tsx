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
          <ReloadIcon className="mr-2 h-3 w-3 animate-spin" />
          Please wait...
        </>
      ) : (
          <>
            {/* these icons are a hack to ensure the button doesn't jump when switching processing state */}
            <ReloadIcon className="h-3 w-3 text-transparent" />
            {children}
            <ReloadIcon className="h-3 w-3 text-transparent" />
          </>
      )}
    </Button>
  )
}

export default ProcessingButton