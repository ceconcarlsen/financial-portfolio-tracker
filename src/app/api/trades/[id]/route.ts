import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { ticker, entryPrice, exitPrice, quantity, date } = await req.json();

    const existingTrade = await prisma.trade.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingTrade) {
      return NextResponse.json({ error: "Trade not found" }, { status: 404 });
    }

    const updatedTrade = await prisma.trade.update({
      where: { id: parseInt(id) },
      data: {
        ticker,
        entryPrice: parseFloat(entryPrice),
        exitPrice: exitPrice ? { set: parseFloat(exitPrice) } : undefined,
        quantity: parseInt(quantity),
        date: new Date(date),
      },
    });

    return NextResponse.json(updatedTrade);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to update trade" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    await prisma.trade.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Trade deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete trade" }, { status: 500 });
  }
}
