import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const local = await prisma.localProfile.findFirst({
      where: {
        id: Number(params.id),
      },
    });
    if (!local) {
      return NextResponse.json(
        {
          message: "Local not found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(local);
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
    const deletedLocal = await prisma.localProfile.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedLocal)
      return NextResponse.json(
        {
          message: "Local not found",
        },
        {
          status: 404,
        },
      );
    return NextResponse.json(deletedLocal);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Local not found",
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
    const {
      description,
      name,
      address,
      city,
      logo,
      type,
      averageScore,
      rol,
      password,
      email,
    } = await request.json();
    const updatedLocal = await prisma.localProfile.update({
      where: {
        id: Number(params.id),
      },
      data: {
        description,
        name,
        address,
        city,
        logo,
        type,
        averageScore,
        rol,
        password,
        email,
      },
    });
    return NextResponse.json(updatedLocal);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Local not found",
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
