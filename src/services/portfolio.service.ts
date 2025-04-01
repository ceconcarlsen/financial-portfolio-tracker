import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "/api/portfolios";

interface Portfolio {
  id: number;
  name: string;
  initialValue: number;
}

export const useGetPortfolios = () => {
  return useQuery<Portfolio[]>({
    queryKey: ["portfolios"],
    queryFn: async (): Promise<Portfolio[]> => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch portfolios");
      const data: Portfolio[] = await res.json();
      return data;
    },
  });
};

export const useCreatePortfolio = () => {
  const queryClient = useQueryClient();
  return useMutation<Portfolio, Error, { name: string; initialValue: number }>({
    mutationFn: async (portfolio): Promise<Portfolio> => {
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
  return useMutation<Portfolio, Error, { id: number; name: string; initialValue: number }>({
    mutationFn: async ({ id, ...updates }): Promise<Portfolio> => {
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
  return useMutation<void, Error, number>({
    mutationFn: async (id): Promise<void> => {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete portfolio");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
      queryClient.invalidateQueries({ queryKey: ["trades"] });
      queryClient.invalidateQueries({ queryKey: ["chartData"] });
    },
  });
};
