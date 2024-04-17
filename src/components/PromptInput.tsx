import React from 'react'

type Props = {
  promptPlaceholder: string;
}

const PromptInput = ({promptPlaceholder = 'Type your prompt here...'}: Props) => {
  return (
    <div>
      <input type="text" placeholder={promptPlaceholder} />
    </div>
  )
}

export default PromptInput