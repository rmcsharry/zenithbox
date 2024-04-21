import { Prompt } from '@/types/Prompt';


const sendToApi = async (prompts: Prompt[]) => {
  const apiRequestBody = {
    "model": "gpt-4-turbo",
    "messages": prompts,
    "temperature": 0,
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    });

  const data = await response.json();
  console.log('response data is:', data);
  return data;
};

export default sendToApi;