import { Prompt } from '@/types/Prompt';


const sendToApi = async (prompts: Prompt[]) => {
  const model = localStorage.getItem("model") || "gpt-3.5-turbo";

  const apiRequestBody = {
    "model": model,
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