import React from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useGetChartData } from "@/services/chart.service";

interface ChartProps {
  title: string;
}

const Chart: React.FC<ChartProps> = ({ title }) => {
  const { data: chartData, isLoading, isError } = useGetChartData();

  if (isLoading) {
    return (
      <Card className="col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <p className="ml-4 text-sm text-muted-foreground">...</p>
        </CardContent>
      </Card>
    );
  }

  if (isError || !chartData) {
    return (
      <Card className="col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <p className="ml-4 text-sm text-muted-foreground">
            Failed to load chart data.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-2 lg:col-span-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <XAxis
                dataKey="portfolioName"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value.toFixed(2)} PLN`}
              />
              <Bar
                dataKey="totalPLN"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="ml-4 text-sm text-muted-foreground">
            No data available for portfolio performance.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default Chart;