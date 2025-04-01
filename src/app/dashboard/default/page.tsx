"use client";

import { useEffect, useState } from "react";

import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import initials from "initials";
import { DollarSign, Users, CreditCard } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { salesData, overviewChartData } from "@/constants/dummy-data";
import { useQueryParamsModal } from "@/hooks/useQueryParamsModal";
import { PortfolioModal } from "@/components/portfolio-modal";
import { TradeModal } from "@/components/trade-modal";
import { useDeletePortfolio, useGetPortfolios } from "@/services/portfolio.service";
import { useToast } from "@/components/ui/use-toast";
import { usePortfolio } from "@/context/usePortfolio.context";

export default function Page() {
  const { openModal: openTradeModal } = useQueryParamsModal("tradeModal");
  const { openModal: openPortfolioModal } = useQueryParamsModal("portfolioModal");
  const { data: portfolios, isLoading } = useGetPortfolios();
  const { mutate: deletePortfolio } = useDeletePortfolio();
  const { activePortfolio, setActivePortfolio } = usePortfolio();

  console.log("activePortfolio", activePortfolio);

  useEffect(() => {
    if (activePortfolio) {
      openPortfolioModal();
    }
  }, [activePortfolio]);

  const handlePortfolio = () => {
    if (activePortfolio) {
      setActivePortfolio(null);
    }
    openPortfolioModal();
  };

  const { toast } = useToast();

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4">
        <div className="flex-col items-center justify-between space-y-2 md:flex md:flex-row">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex-col items-center space-y-2 md:flex md:flex-row md:space-x-2 md:space-y-0">
            <div className="flex">
              <Button onClick={handlePortfolio}>+ Portfolio</Button>
              <PortfolioModal />
            </div>
            <div className="flex">
              <Button onClick={openTradeModal}>+ Trade</Button>
              <TradeModal />
            </div>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Balance</CardTitle>
                  <DollarSign className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Portfolios</CardTitle>
                  <Users className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{portfolios?.length}</div>
                  <p className="text-xs text-muted-foreground">+2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Trades</CardTitle>
                  <CreditCard className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">+19% from last month</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
              <Card className="col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Portfolios</CardTitle>
                  <CardDescription>
                    {isLoading ? `...` : `You have ${portfolios?.length} portfolios in total.`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {portfolios?.map((portfolio) => (
                      <div
                        key={portfolio.id}
                        className={'flex items-center'}
                        onClick={() => setActivePortfolio(portfolio)}
                      >
                        <Avatar className="size-9">
                          <AvatarFallback>{initials(portfolio.name)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">{portfolio.name}</p>
                        </div>
                        <div className="ml-auto flex items-center space-x-2">
                          <span className="font-medium">
                            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                              portfolio.initialValue,
                            )}
                          </span>
                          <Button variant="destructive" size="sm" onClick={() => deletePortfolio(portfolio.id)}>
                            <span className="sr-only">Delete</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Trades</CardTitle>
                  <CardDescription>You made 265 sales this month.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {salesData.map((sale) => (
                      <div key={sale.name} className="flex items-center">
                        <Avatar className="size-9">
                          <AvatarFallback>{initials(sale.name)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">{sale.name}</p>
                          <p className="text-xs text-muted-foreground md:text-sm">{sale.email}</p>
                        </div>
                        <div className="ml-auto font-medium">{sale.amount}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="col-span-2 lg:col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={overviewChartData}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
