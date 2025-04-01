import React, { createContext, useContext, useState, ReactNode } from "react";
import { z } from "zod";

export const tradeSchema = z
  .object({
    id: z.number({ invalid_type_error: "Portfolio ID must be a number" }),
    portfolioId: z.number().min(1, { message: "Please select a portfolio" }),
    ticker: z.string().min(1, { message: "Ticker is required" }),
    entryPrice: z.number().min(0, { message: "Entry price must be a positive number" }),
    exitPrice: z
      .number()
      .refine((value) => value === undefined || value >= 0, {
        message: "Exit price must be a positive number",
      })
      .nullable(),
    quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
    date: z
      .string()
      .min(1, { message: "Date is required" })
      .refine((value) => !isNaN(Date.parse(value)), {
        message: "Please provide a valid date",
      }),
  })
  .nullable();

export type Trade = z.infer<typeof tradeSchema>;

type TradeContextType = {
  activeTrade: Trade | null;
  setActiveTrade: (trade: Trade) => void;
};

const TradeContext = createContext<TradeContextType | undefined>(undefined);

export const TradeProvider = ({ children }: { children: ReactNode }) => {
  const [activeTrade, setActiveTradeState] = useState<Trade | null>(null);

  const setActiveTrade = (trade: Trade) => {
    const result = tradeSchema.safeParse(trade);
    if (!result.success) {
      console.error("Invalid trade data:", result.error.format());
      return;
    }
    setActiveTradeState(result.data);
  };

  return <TradeContext.Provider value={{ activeTrade, setActiveTrade }}>{children}</TradeContext.Provider>;
};

export const useTrade = () => {
  const context = useContext(TradeContext);
  if (!context) {
    throw new Error("useTrade must be used within a TradeProvider");
  }
  return context;
};
