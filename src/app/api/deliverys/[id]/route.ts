import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const delivery = await prisma.deliveryDriverProfile.findFirst({
      where: {
        id: Number(params.id),
      },
    });
    if (!delivery) {
      return NextResponse.json(
        {
          message: "Delivery not found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(delivery);
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

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deletedDelivery = await prisma.deliveryDriverProfile.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedDelivery)
      return NextResponse.json(
        {
          message: "Delivery not found",
        },
        {
          status: 404,
        },
      );
    return NextResponse.json(deletedDelivery);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Note not found",
          },
          {
            status: 404,
          },
        );
      }
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

export async function PUT(request: Request, { params }: Params) {
  try {
    const { name, lastName, averageScore, email, rol, password } =
      await request.json();
    const updatedNote = await prisma.deliveryDriverProfile.update({
      where: {
        id: Number(params.id),
      },
      data: {
        name,
        lastName,
        averageScore,
        email,
        rol,
        password,
      },
    });
    return NextResponse.json(updatedNote);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Delivery not found",
          },
          {
            status: 404,
          },
        );
      }
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
