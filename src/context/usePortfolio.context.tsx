import React, { createContext, useContext, useState, ReactNode } from "react";
import { z } from "zod";

export const portfolioSchema = z
  .object({
    id: z.number({ invalid_type_error: "Portfolio ID must be a number" }).optional(),
    name: z
      .string()
      .min(1, { message: "Portfolio name is required" })
      .max(100, { message: "Portfolio name must not exceed 100 characters" }),
    initialValue: z
      .number({ invalid_type_error: "Initial value must be a number" })
      .min(0, { message: "Initial value must be at least 0" }),
  })
  .nullable();

export type Portfolio = z.infer<typeof portfolioSchema>;

type PortfolioContextType = {
  activePortfolio: Portfolio | null;
  setActivePortfolio: (portfolio: Portfolio) => void;
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [activePortfolio, setActivePortfolioState] = useState<Portfolio | null>(null);

  const setActivePortfolio = (portfolio: Portfolio | null) => {
    setActivePortfolioState(portfolio);
  };

  return (
    <PortfolioContext.Provider value={{ activePortfolio, setActivePortfolio }}>{children}</PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
