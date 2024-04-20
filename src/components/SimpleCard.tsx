import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ReloadIcon } from '@radix-ui/react-icons';

type Props = {
  children: React.ReactNode;
}

const SimpleCard = ({children}: Props) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Response</CardTitle>
      </CardHeader>
      <CardContent>
        {children? <div>{children}</div> : <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      </CardContent>
    </Card>
  )
}

export default SimpleCard