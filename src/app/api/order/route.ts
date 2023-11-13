import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const orderStatus = await prisma.order.findMany();
    return NextResponse.json(orderStatus);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        },
      );
    }
  }
}

export async function POST(request: Request) {
  try {
    const { status, products, sellerId, userId } = await request.json();
    const newOrderStatus = await prisma.order.create({
      data: {
        status,
        products,
        sellerId,
        userId,
      },
    });
    return NextResponse.json(newOrderStatus);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ status: 404 });
    }
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        },
      );
    }
  }
}
