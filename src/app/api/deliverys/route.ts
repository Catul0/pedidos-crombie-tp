import { NextResponse } from "next/server";
import {Prisma} from '@prisma/client'
import {prisma} from '@/libs/prisma'
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

export async function GET() {
    try {
        const deliverys = await prisma.deliveryDriverProfile.findMany()
        return NextResponse.json(deliverys)
    } catch (error) {
        if (error instanceof Error){
            return NextResponse.json({
                message:error.message
            }, {
                status: 500,
            })
        }
    }
}

export async function POST(request: Request) {
    try {
        const {name, lastName, averageScore, email, password} = await request.json()
        const hash = await bcrypt.hash(password, 10);
        const newDelivery = await prisma.deliveryDriverProfile.create({
            data: {
                name,
                lastName,
                averageScore,
                email,
                password: hash,
            }
        })
        const token = sign(newDelivery, 'SECRETO', { expiresIn: '1h' });
        return NextResponse.json({newDelivery, token});
    } catch (error) {
        // el error P2002 es el codigo de error de cuando un email ya se encuentra en la base de datos
        // nota: cuando un usuario se intenta registrar con un email ya registrado, no lo deja pero el contador del id aumenta igual
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if (error.code === "P2002"){
                return NextResponse.json({
                    message:"Este email ya esta registrado",
                },{
                    status: 404,
                })
            }
        }
        if (error instanceof Error){
            return NextResponse.json({
                message:error.message
            }, {
                status: 500,
            })
        }
    }
}