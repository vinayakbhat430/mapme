import axios, { Method, AxiosResponse } from "axios";
import React, { useState } from "react";

interface RequestProps {
  url: string;
  method: Method;
  body?: Record<string, any>;
  onSuccess?: (data: any) => void;
}

interface ErrorResponse {
  message: string;
}

const useRequest = ({ url, method, body = {}, onSuccess }: RequestProps) => {
  const [errors, setErrors] = useState<JSX.Element | null>(null);

  const doRequest = async (props: Record<string, any> = {}): Promise<any> => {
    try {
      setErrors(null);

      const response: AxiosResponse = await axios.request({
        url,
        method,
        data: { ...body, ...props },
      });

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err: any) {
      const errorMessages = err?.response?.data?.errors as ErrorResponse[] | undefined;

      setErrors(
        <div className="text-red-500">
          <h4>Oops....</h4>
          <ul className="my-0">
            {errorMessages ? (
              errorMessages.map((error: ErrorResponse, index: number) => (
                <li key={index} className="text-red-500">{error.message}</li>
              ))
            ) : (
              <li className="text-red-500">An unexpected error occurred.</li>
            )}
          </ul>
        </div>
      );
    }
  };

  return { errors, doRequest };
};

export default useRequest;
