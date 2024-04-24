import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChevronRightIcon, ReloadIcon } from '@radix-ui/react-icons';
import ProcessingButton from '@/components/ProcessingButton';
import { appendToLocalStorage } from '@/lib/utils';
import { getControlDocs } from '@/types/ZenithCommand';
import { toast } from 'sonner';

type Props = {
  aiMessage: string;
}

const ResponseCard = ({ aiMessage }: Props) => {

  const handleFinalize = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    appendToLocalStorage(getControlDocs()[3].name, aiMessage);
    toast.success("Response added to FDD", { position: "top-right" });
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>
          {aiMessage && (
            <ProcessingButton doProcessing={handleFinalize} variant="outline">
              Finalize <ChevronRightIcon className="ml-2 h-4 w-4" />
            </ProcessingButton>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {aiMessage ? <div>{aiMessage}</div> : <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      </CardContent>
    </Card>
  )
}

export default ResponseCard