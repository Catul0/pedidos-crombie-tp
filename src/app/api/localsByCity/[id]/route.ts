import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const user = await prisma.user.findUnique({
        where: {
          id: Number(params.id),
        },
    });

    if (!user) {
        return NextResponse.json(
          {
            message: "User not found",
          },
          {
            status: 404,
          },
        );
    }

    const localProfiles = await prisma.localProfile.findMany({
        where: {
          city: user.city,
        },
    });

    return NextResponse.json(localProfiles)
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