import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: Request, { params }: { params: { id: number } }) {
  try {
    const { id } = params;
    const { name, initialValue } = await req.json();

    const updatedPortfolio = await prisma.portfolio.update({
      where: { id },

      data: { name, initialValue: parseFloat(initialValue) },
    });

    return NextResponse.json(updatedPortfolio);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update portfolio", }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: number } }) {
  try {
    const { id } = params;

    await prisma.portfolio.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Portfolio deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete portfolio" }, { status: 500 });
  }
}
