import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password, userType } = await req.json();
  const cookieStore = cookies();

  //va a buscar en x tabla segun el valor de userType que le mandamos por front
  try {
    let user;

    switch (userType) {
      case 'user':
        user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        break;
      case 'delivery':
        user = await prisma.deliveryDriverProfile.findUnique({
          where: {
            email: email,
          },
        });
        break;
      case 'seller':
        user = await prisma.localProfile.findUnique({
          where: {
            email: email,
          },
        });
        break;
      default:
        return NextResponse.json(
          { message: 'Tipo de usuario no válido' },
          { status: 400 }
        );
    }
    
    if (!user){
        return NextResponse.json(
            { message: 'El email no esta registrado' },
            { status: 401 }
        );
    } else if (!(await bcrypt.compare(password, user.password))){
        return NextResponse.json(
            { message: 'Contraseña incorrecta' },
            { status: 401 }
        );
    }

    const token = sign({ id: user.id, rol: userType }, 'SECRETO', {
      expiresIn: '1h',
    });

    cookieStore.set("token", token);

    return NextResponse.json({ status: 200 });
    
  } catch (error) {
    console.error('Error de inicio de sesión:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
