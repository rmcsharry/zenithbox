
import { useQuery } from "@tanstack/react-query"

export function useOpenAICompletions(apiRequestBody: any) {
  // const res = await fetch("https://jsonplaceholder.typicode.com/albums/1/photos");
  // if (!res.ok) throw new Error("Failed to fetch");

  return useQuery({
    queryFn: async () => await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    })
    ,
    queryKey: ["completions"],
  })
}