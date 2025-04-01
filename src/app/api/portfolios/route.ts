import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"; 

const prisma = new PrismaClient();

export async function GET() {
  try {
    const portfolios = await prisma.portfolio.findMany();
    return NextResponse.json(portfolios);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch portfolios" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, initialValue } = await req.json();

    if (!name || initialValue == null) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const portfolio = await prisma.portfolio.create({
      data: { name, initialValue: parseFloat(initialValue) },
    });

    return NextResponse.json(portfolio, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create portfolio" }, { status: 500 });
  }
}
