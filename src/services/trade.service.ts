import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "/api/trades";

export const useGetTrades = (portfolioId: number) => {
  return useQuery({
    queryKey: ["trades", portfolioId],
    queryFn: async () => {
      const res = await fetch(`${API_URL}?portfolioId=${portfolioId}`);
      if (!res.ok) throw new Error("Failed to fetch trades");
      return res.json();
    },
    enabled: !!portfolioId,
  });
};

export const useCreateTrade = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (trade: { portfolioId: number; ticker: string; entryPrice: number; exitPrice?: number; quantity: number; date: string }) => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trade),
      });
      if (!res.ok) throw new Error("Failed to create trade");
      return res.json();
    },
    onSuccess: (_, variables) =>
      queryClient.invalidateQueries({ queryKey: ["trades", variables.portfolioId] }),
  });
};

export const useUpdateTrade = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: number; ticker: string; entryPrice: number; exitPrice?: number; quantity: number; date: string }) => {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update trade");
      return res.json();
    },
    onSuccess: (_, variables) =>
      queryClient.invalidateQueries({ queryKey: ["trades", variables.id] }),
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
    onSuccess: (_, variables) =>
      queryClient.invalidateQueries({ queryKey: ["trades", variables] }),
  });
};
