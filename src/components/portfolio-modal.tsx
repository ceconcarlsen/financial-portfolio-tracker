"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryParamsModal } from "@/hooks/useQueryParamsModal";
import { useCreatePortfolio, useUpdatePortfolio } from "@/services/portfolio.service";
import { Portfolio, portfolioSchema, usePortfolio } from "@/context/usePortfolio.context";
import { useEffect } from "react";

export function PortfolioModal() {
  const { mutate: createPortfolio, isPending: isCreating } = useCreatePortfolio();
  const { mutate: updatePortfolio, isPending: isUpdating } = useUpdatePortfolio();
  const { isOpen, closeModal } = useQueryParamsModal("portfolioModal");
  const { activePortfolio, setActivePortfolio } = usePortfolio();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Portfolio>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: activePortfolio || { name: "", initialValue: 0 },
  });

  const onSubmit = (data: Portfolio) => {
    if (activePortfolio) {
      updatePortfolio(
        { ...activePortfolio, ...data },
        {
          onSuccess: () => {
            closeModal();
            setActivePortfolio(null);
          },
        },
      );
    } else {
      createPortfolio(data, {
        onSuccess: closeModal,
      });
    }
  };

  useEffect(() => {
    reset(activePortfolio || { name: "", initialValue: 0 });
  }, [activePortfolio, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{activePortfolio ? "Edit Portfolio" : "Create Portfolio"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} placeholder="Enter portfolio name" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="initialValue">Initial Value</Label>
              <Input
                id="initialValue"
                type="number"
                step="0.01"
                {...register("initialValue", { valueAsNumber: true })}
                placeholder="1000"
              />
              {errors.initialValue && <p className="text-red-500 text-sm">{errors.initialValue.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating ? "Saving..." : activePortfolio ? "Edit" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
