import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import useErrorStore from '../../store/useErrorStore';

type Props = {
  className?: string;
}

export function AlertDestructive({ className }: Props) {
  const error = useErrorStore((state: any) => state.error);

  return (
    <Alert variant="destructive" className={`${className}`}>
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error}
      </AlertDescription>
    </Alert>
  )
}
