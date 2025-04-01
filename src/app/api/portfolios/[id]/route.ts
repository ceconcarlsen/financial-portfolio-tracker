import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name, initialValue } = await req.json();

    const updatedPortfolio = await prisma.portfolio.update({
      where: { id: parseInt(id) },

      data: { name, initialValue: parseFloat(initialValue) },
    });

    return NextResponse.json(updatedPortfolio);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to update portfolio", }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const relatedTrades = await prisma.trade.findMany({
      where: { portfolioId: parseInt(id) },
    });
    
    if (relatedTrades.length > 0) {
      await prisma.trade.deleteMany({
      where: { portfolioId: parseInt(id) },
      });
    }

    await prisma.portfolio.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Portfolio deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to delete portfolio" }, { status: 500 });
  }
}
