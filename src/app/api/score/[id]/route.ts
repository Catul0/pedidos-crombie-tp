import { NextResponse } from "next/server";
import {Prisma} from '@prisma/client'
import {prisma} from '@/libs/prisma'

interface Params { params: {id: string}}

export async function GET(request: Request, {params}: Params) {
    try {
        const score = await prisma.score.findFirst({
            where: {
                id: Number(params.id)
            }
        })
        if (!score){
            return NextResponse.json({
                message: "Score not found",
            }, {
                status: 404,
            })
        }
        return NextResponse.json(score);
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
        const deletedScore = await prisma.score.delete({
            where: {
                id: Number(params.id)
            }
        })
        if(!deletedScore) return NextResponse.json({
            message: "Score not found"
        }, {
            status: 404,
        })
        return NextResponse.json(deletedScore)
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if (error.code === "P2025"){
                return NextResponse.json({
                    message:"Score not found",
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
        const { 
                userId,
                score,
                deliveryId=null,
                localId=null
            } = await request.json()
        const updatedScore = await prisma.score.update({
            where: {
                id: Number(params.id)
            },
            data: {
                userId,
                score,
                deliveryId,
                localId
            }
        })
        return NextResponse.json(updatedScore)
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