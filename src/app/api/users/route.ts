import { NextResponse } from "next/server";
import {Prisma} from '@prisma/client'
import {prisma} from '@/libs/prisma'


export async function GET() {
    try {
        const users = await prisma.user.findMany()
        return NextResponse.json(users)
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
        const {name, lastName, phone, address, city, email, password} = await request.json()
        const newUser = await prisma.user.create({
            data: {
                name,
                lastName,
                phone,
                address,
                city,
                email,
                password
            }
        })
        return NextResponse.json(newUser)
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