"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const tanstackQueryClient = new QueryClient();

/**
 * @description - Provider for Tanstack Query Client.
 * @param props - Props.
 * @param props.children - Children.
 * @returns {JSX.Element} - Provider for Tanstack Query Client.
 */
export const TanstackQueryClientProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }): JSX.Element => {
  return (
    <QueryClientProvider client={tanstackQueryClient}>
      {children}
    </QueryClientProvider>
  );
};
