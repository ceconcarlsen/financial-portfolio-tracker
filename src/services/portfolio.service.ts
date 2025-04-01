import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch all portfolios
const fetchPortfolios = async () => {
  const response = await fetch('/api/portfolios');
  if (!response.ok) {
    throw new Error('Error fetching portfolios');
  }
  return response.json();
};

// Create a new portfolio
const createPortfolio = async (portfolioData: { name: string; initialValue: number }): Promise<{ name: string; initialValue: number }> => {
  const response = await fetch('/api/portfolios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(portfolioData),
  });
  if (!response.ok) {
    throw new Error('Error creating portfolio');
  }
  return response.json() as Promise<{ name: string; initialValue: number }>;
};

// Update an existing portfolio
const updatePortfolio = async ({ id, portfolioData }: { id: number; portfolioData: { name: string; initialValue: number } }) => {
  const response = await fetch(`/api/portfolios/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(portfolioData),
  });
  if (!response.ok) {
    throw new Error('Error updating portfolio');
  }
  return response.json();
};

// Delete a portfolio
const deletePortfolio = async (id: number): Promise<number> => {
  const response = await fetch(`/api/portfolios/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error deleting portfolio');
  }
  const data = await response.json();
  return data as number;
};

export const useGetAllPortfolios = () => {
  return useQuery({ queryKey: ['portfolios'], queryFn: fetchPortfolios });
};

export const useCreatePortfolio = () => {
  const queryClient = useQueryClient();
  return useMutation<{ name: string; initialValue: number }, Error, { name: string; initialValue: number }>({
    mutationFn: createPortfolio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] });
    },
  });
};

export const useUpdatePortfolio = () => {
  const queryClient = useQueryClient();
  return useMutation<{ id: number; portfolioData: { name: string; initialValue: number } }, Error, { id: number; portfolioData: { name: string; initialValue: number } }>({
    mutationFn: updatePortfolio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] });
    },
  });
};

export const useDeletePortfolio = () => {
  const queryClient = useQueryClient();
  return useMutation<number, Error, number>({
    mutationFn: (id: number) => deletePortfolio(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] });
    },
  });
};