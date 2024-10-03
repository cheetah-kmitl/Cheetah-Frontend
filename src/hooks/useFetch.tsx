import { useState } from "react"

export const useFetch = <T,>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body?: BodyInit
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      
      const response = await fetch(url, { method, body });
      if (!response.ok) {
        throw new Error();
      }

      const data: T = (await response.json()) as T;
      return data;
    }
    catch {
      setIsError(true);
    }
    finally {
      setIsLoading(false);
    }

    return null;
};

  return { fetchData, isLoading, isError };
}