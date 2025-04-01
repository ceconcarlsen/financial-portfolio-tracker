import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const portfolioId = url.searchParams.get("portfolioId");

    if (!portfolioId) {
      return NextResponse.json({ error: "Missing portfolioId" }, { status: 400 });
    }

    const trades = await prisma.trade.findMany({
      where: { portfolioId: parseInt(portfolioId) },
      orderBy: { date: "asc" },
    });

    const tradesWithPnL = trades.map((trade) => ({
      ...trade,
      pnl: (trade.exitPrice - trade.entryPrice) * trade.quantity,
    }));

    return NextResponse.json(tradesWithPnL);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch trades" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { portfolioId, ticker, entryPrice, exitPrice, quantity, date } = await req.json();

    if (!portfolioId || !ticker || !entryPrice || !quantity || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const trade = await prisma.trade.create({
      data: {
        portfolioId: parseInt(portfolioId),
        ticker,
        entryPrice: parseFloat(entryPrice),
        exitPrice: parseFloat(exitPrice || "0"),
        quantity: parseInt(quantity),
        date: new Date(date),
      },
    });

    return NextResponse.json(trade, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create trade" }, { status: 500 });
  }
}
