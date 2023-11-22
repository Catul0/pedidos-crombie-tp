import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: Number(params.id),
      },
    });
    if (!orders) {
      return NextResponse.json(
        {
          message: "Product not found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(orders);
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