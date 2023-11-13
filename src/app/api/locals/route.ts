import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const localProfiles = await prisma.localProfile.findMany();
    return NextResponse.json(localProfiles);
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
  const cookieStore = cookies();
  try {
    const {
      description,
      name,
      address,
      city,
      logo,
      type,
      averageScore = null,
      password,
      email,
    } = await request.json();
    const hash = await bcrypt.hash(password, 10);
    const newLocalProfile = await prisma.localProfile.create({
      data: {
        description,
        name,
        address,
        city,
        logo,
        type,
        averageScore,
        rol: "seller",
        password: hash,
        email,
      },
    });
    const token = sign(
      { id: newLocalProfile.id, rol: newLocalProfile.rol },
      "SECRETO",
      {
        expiresIn: "1h",
      },
    );

    cookieStore.set("token", token);
    return NextResponse.json({ newLocalProfile, token });
  } catch (error) {
    // el error P2002 es el codigo de error de cuando un email ya se encuentra en la base de datos
    // nota: cuando un usuario se intenta registrar con un email ya registrado, no lo deja pero el contador del id aumenta igual
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            message: "Este email ya esta registrado",
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
