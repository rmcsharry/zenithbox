import React, { FormEvent } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CommandOption } from '@/types/ZenithCommand';

type Props = {
  option: CommandOption;
  onOptionChange: (value: CommandOption) => void;
}

const SendingOptions = ({option, onOptionChange}: Props) => {
  return (
    <RadioGroup defaultValue={option} className="flex flex-row" onValueChange={(value: CommandOption) => onOptionChange(value)}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="ignore" id="r1" />
        <Label htmlFor="r1" className="text-xs">Ignore</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="separate" id="r2" />
        <Label htmlFor="r2" className="text-xs">Separate</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="append" id="r3" />
        <Label htmlFor="r3" className="text-xs">Append</Label>
      </div>
    </RadioGroup>
  )
}

export default SendingOptions;
