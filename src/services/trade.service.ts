import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "/api/trades";

export const useGetTrades = () => {
  return useQuery({
    queryKey: ["trades"],
    queryFn: async (): Promise<
      Array<{
        id: number;
        portfolioId: number;
        ticker: string;
        entryPrice: number;
        exitPrice: number | null;
        quantity: number;
        date: string;
        pnl: number;
      }>
    > => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch trades");
      return res.json();
    },
  });
};

export const useCreateTrade = () => {
  const queryClient = useQueryClient();
  return useMutation<any, unknown, { portfolioId: number; ticker: string; entryPrice: number; exitPrice?: number; quantity: number; date: string }>({
    mutationFn: async (trade: { portfolioId: number; ticker: string; entryPrice: number; exitPrice?: number; quantity: number; date: string }): Promise<any> => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trade),
      });
      if (!res.ok) throw new Error("Failed to create trade");
      return res.json();
    },
    onSuccess: async (_, variables: { portfolioId: number }) => {
      await queryClient.invalidateQueries('trades');
      await queryClient.invalidateQueries('chartData');
    },
  });
};

export const useUpdateTrade = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: number; portfolioId: number; ticker: string; entryPrice: number; exitPrice?: number; quantity: number; date: string }) => {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update trade");
      return res.json();
    },
    onSuccess: async (_, variables: { portfolioId: number }) => {
      await queryClient.invalidateQueries('trades');
      await queryClient.invalidateQueries('chartData');
    },
  });
};

export const useDeleteTrade = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete trade");
      return res.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries('trades');
      await queryClient.invalidateQueries('chartData');
    },
  });
};
