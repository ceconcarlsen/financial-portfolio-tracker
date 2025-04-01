import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "/api/portfolios";

export const useGetPortfolios = () => {
  return useQuery({
    queryKey: ["portfolios"],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch portfolios");
      return res.json();
    },
  });
};

export const useCreatePortfolio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (portfolio: { name: string; initialValue: number }) => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(portfolio),
      });
      if (!res.ok) throw new Error("Failed to create portfolio");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["portfolios"] }),
  });
};

export const useUpdatePortfolio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: number; name: string; initialValue: number }) => {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update portfolio");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["portfolios"] }),
  });
};

export const useDeletePortfolio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete portfolio");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["portfolios"] }),
  });
};
