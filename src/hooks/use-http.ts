import { useState, useCallback } from "react";

export interface Config {
  url: string;
  body?: any;
  method?: string;
  headers?: HeadersInit;
}

const useHttp = () => {
  /*#TA-01 */
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  /* #TA03 
     use useCallback so we don't recreate this function for each
     re-rendering cycle
  */
  const sendRequest = useCallback(
    async (config: Config, receiveData: (data: any) => void) => {
      setIsLoading(true);
      setError(undefined);
      try {
        const response = await fetch(config.url, {
          method: config.method || "GET",
          headers: config.headers || [],
          body: config.body ? JSON.stringify(config.body) : null,
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data = await response.json();
        receiveData(data);
      } catch (err: any) {
        const msg = err.message || "Something went wrong";
        setError(new Error(msg));
      }

      setIsLoading(false);
    },
    []
  );

  return [isLoading, error, sendRequest] as const;
};

export default useHttp;
