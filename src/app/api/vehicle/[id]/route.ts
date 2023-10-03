import { NextResponse } from "next/server";
import {Prisma} from '@prisma/client'
import {prisma} from '@/libs/prisma'

interface Params { params: {id: string}}

export async function GET(request: Request, {params}: Params) {
    try {
        const vehicle = await prisma.vehicle.findFirst({
            where: {
                vehicleOwner: Number(params.id)
            }
        })
        if (!vehicle){
            return NextResponse.json({
                message: "Vehicle not found",
            }, {
                status: 404,
            })
        }
        return NextResponse.json(vehicle);
    } catch (error) {
        if (error instanceof Error){
            return NextResponse.json(
                {
                    message:error.message,
                }, {
                    status: 500,
                }
            )
        }
    }
}

export async function DELETE(request: Request, {params}: Params) {
    try {
        const deletedVehicle = await prisma.vehicle.deleteMany({
            where: {
                vehicleOwner: Number(params.id)
            }
        })
        if(!deletedVehicle) return NextResponse.json({
            message: "Vehicle not found"
        }, {
            status: 404,
        })
        return NextResponse.json(deletedVehicle)
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if (error.code === "P2025"){
                return NextResponse.json({
                    message:"Vehicle not found",
                },{
                    status: 404,
                })
            }
        }
        if (error instanceof Error){
            return NextResponse.json({
                message: error.message,
            },{
                status: 500,
            })
        }
    }
}

export async function PUT(request: Request, {params}: Params) {
    try {
        const {brand,model,licensePlate,vehicleOwner,color,year} = await request.json()
        const updatedVehicle = await prisma.vehicle.update({
            where: {
                id: Number(params.id)
            },
            data: {
                brand,model,licensePlate,vehicleOwner,color,year
            }
        })
        return NextResponse.json(updatedVehicle)
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
                return NextResponse.json({
                    status: 404,
                })
        }
        if (error instanceof Error){
            return NextResponse.json({
                message: error.message,
            }, {
                status: 500,
            })
        }
    }
}