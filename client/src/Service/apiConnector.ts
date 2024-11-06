import axios, { AxiosRequestConfig } from 'axios';

// Create an axios instance
const axiosInstance = axios.create({});

// Define the function with types for the parameters
export const connectToApi = (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', // HTTP method type
  url: string, // URL type
  body: Record<string, any> | null = null, // Body type (can be any object or null)
  headers: Record<string, string> | undefined = undefined, // Use `undefined` instead of `null`
  params: Record<string, string | number> | null = null // Params type (query params)
) => {
  // Axios request config
  const config: AxiosRequestConfig = {
    method,
    url,
    data: body ?? null, // Use 'data' for body in Axios
    headers: headers, // Pass headers (undefined is allowed)
    params: params ?? null,
  };

  // Make the request and return the result
  return axiosInstance(config);
};
