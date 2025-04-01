import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch all trades for a specific portfolio
const fetchTrades = async (portfolioId: number) => {
  const response = await fetch(`/api/trades?portfolioId=${portfolioId}`);
  if (!response.ok) {
    throw new Error('Error fetching trades');
  }
  return response.json();
};

// Create a new trade
const createTrade = async (tradeData: {
  portfolioId: number;
  ticker: string;
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  date: string;
}) => {
  const response = await fetch('/api/trades', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tradeData),
  });
  if (!response.ok) {
    throw new Error('Error creating trade');
  }
  return response.json();
};

// Update an existing trade
const updateTrade = async ({ id, ...tradeData }: { id: number; ticker: string; entryPrice: number; exitPrice: number; quantity: number; date: string }): Promise<{ id: number; ticker: string; entryPrice: number; exitPrice: number; quantity: number; date: string }> => {
  const response = await fetch(`/api/trades/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tradeData),
  });
  if (!response.ok) {
    throw new Error('Error updating trade');
  }
  return response.json();
};

// Delete a trade
const deleteTrade = async (id: number): Promise<void> => {
  const response = await fetch(`/api/trades/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error deleting trade');
  }
};

export const useGetAllTrades = (portfolioId: number) => {
  return portfolioId
    ? useQuery({ queryKey: ['trades', portfolioId], queryFn: () => fetchTrades(portfolioId) })
    : { data: null, isLoading: false, isError: false };
};

export const useCreateTrade = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, { portfolioId: number; ticker: string; entryPrice: number; exitPrice: number; quantity: number; date: string }>({
    mutationFn: createTrade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trades'] });
    },
  });
};

export const useUpdateTrade = () => {
  const queryClient = useQueryClient();
  return useMutation<{ id: number; ticker: string; entryPrice: number; exitPrice: number; quantity: number; date: string }, Error, { id: number; ticker: string; entryPrice: number; exitPrice: number; quantity: number; date: string }>({
    mutationFn: updateTrade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trades'] });
    },
  });
};

export const useDeleteTrade = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deleteTrade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trades'] });
    },
  });
};