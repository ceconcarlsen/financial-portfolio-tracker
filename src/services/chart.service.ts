import { useQuery } from "@tanstack/react-query";

interface PortfolioChartData {
  portfolioId: string;
  portfolioName: string;
  totalPLN: number;
}

export const useGetChartData = () => {
  return useQuery<PortfolioChartData[]>({
    queryKey: ["chartData"],
    queryFn: async (): Promise<PortfolioChartData[]> => {
      const response = await fetch("/api/chart");
      const portfolios = await response.json();
      if (!Array.isArray(portfolios)) {
        throw new Error("Invalid data format: portfolios should be an array");
      }
      const chartData = portfolios.map((portfolio: any) => ({
        portfolioId: portfolio.portfolioId || "unknown",
        portfolioName: portfolio.portfolioName || "unknown",
        totalPLN: portfolio.totalPLN || 0,
      }));
      return chartData;
    },
  });
};
