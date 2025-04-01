"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQueryParamsModal } from "@/hooks/useQueryParamsModal";
import { useCreateTrade } from "@/services/trade.service";
import { useGetPortfolios } from "@/services/portfolio.service";

const tradeSchema = z.object({
  portfolioId: z.string().min(1, { message: "Please select a portfolio" }),
  ticker: z.string().min(1, { message: "Ticker is required" }),
  entryPrice: z
    .number()
    .min(0, { message: "Entry price must be a positive number" }),
  exitPrice: z
    .number()
    .optional()
    .refine((value) => value === undefined || value >= 0, {
      message: "Exit price must be a positive number",
    }),
  quantity: z
    .number()
    .min(1, { message: "Quantity must be at least 1" }),
  date: z
    .string()
    .min(1, { message: "Date is required" })
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "Please provide a valid date",
    }),
});

type TradeFormData = z.infer<typeof tradeSchema>;

export function TradeModal() {
  const { isOpen, closeModal } = useQueryParamsModal("tradeModal");
  const createTrade = useCreateTrade();
  const { data: portfolios, isLoading } = useGetPortfolios();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TradeFormData>({
    resolver: zodResolver(tradeSchema),
  });

  const onSubmit = (data: TradeFormData) => {
    createTrade.mutate({ ...data, portfolioId: Number(data.portfolioId) }, { onSuccess: closeModal });
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Trade</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="portfolio">Portfolio</Label>
              <Select onValueChange={(value) => setValue("portfolioId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder={isLoading ? "Loading portfolios..." : "Select a portfolio"} />
                </SelectTrigger>
                <SelectContent>
                  {portfolios?.map((portfolio) => (
                    <SelectItem key={portfolio.id} value={String(portfolio.id)}>
                      {portfolio.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.portfolioId && <p className="text-red-500 text-sm">{errors.portfolioId.message}</p>}
            </div>
            <div>
              <Label htmlFor="ticker">Ticker</Label>
              <Input id="ticker" {...register("ticker")} placeholder="AAPL" />
              {errors.ticker && <p className="text-red-500 text-sm">{errors.ticker.message}</p>}
            </div>
            <div>
              <Label htmlFor="entryPrice">Entry Price</Label>
              <Input
                id="entryPrice"
                type="number"
                step="0.01"
                {...register("entryPrice", { valueAsNumber: true })}
                placeholder="150.00"
              />
              {errors.entryPrice && <p className="text-red-500 text-sm">{errors.entryPrice.message}</p>}
            </div>
            <div>
              <Label htmlFor="exitPrice">Exit Price (optional)</Label>
              <Input
                id="exitPrice"
                type="number"
                step="0.01"
                {...register("exitPrice", { valueAsNumber: true })}
                placeholder="155.00"
              />
            </div>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" type="number" {...register("quantity", { valueAsNumber: true })} placeholder="10" />
              {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" {...register("date")} />
              {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={createTrade.isPending || isLoading}>
              {createTrade.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
