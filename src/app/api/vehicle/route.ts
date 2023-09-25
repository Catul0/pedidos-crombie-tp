import { NextResponse } from "next/server";
import {Prisma} from '@prisma/client'
import {prisma} from '@/libs/prisma'


export async function GET() {
    try {
        const vehicle = await prisma.vehicle.findMany()
        return NextResponse.json(vehicle)
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
        const {brand,model,licensePlate,vehicleOwner,color,year} = await request.json()
        const newVehicle = await prisma.vehicle.create({
            data: {
                brand,model,licensePlate,vehicleOwner,color,year
            }
        })
        return NextResponse.json(newVehicle)
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            return NextResponse.json({  status: 404,})
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