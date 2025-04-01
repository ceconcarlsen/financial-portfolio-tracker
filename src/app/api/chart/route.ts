import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      include: {
        trades: true,
      },
    });

    const chartData = portfolios.map((portfolio) => {
      const totalPLN = portfolio.trades.reduce((sum, trade) => {
        const plnValue = (trade.exitPrice - trade.entryPrice) * trade.quantity;
        return sum + plnValue;
      }, 0);

      return {
        portfolioId: portfolio.id,
        portfolioName: portfolio.name,
        totalPLN,
      };
    });

    return NextResponse.json(chartData);
  } catch (error) {
    console.error("Error fetching portfolios or trades:", error);
    return NextResponse.json({ error: "Failed to fetch portfolios or trades" }, { status: 500 });
  }
}
