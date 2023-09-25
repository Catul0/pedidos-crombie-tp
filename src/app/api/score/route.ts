import { NextResponse } from "next/server";
import {Prisma} from '@prisma/client'
import {prisma} from '@/libs/prisma'


export async function GET() {
    try {
        const score = await prisma.score.findMany()
        return NextResponse.json(score)
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
        const {userId,
            deliveryId=null,
            LocalId=null
            } = await request.json()
        const newScore = await prisma.score.create({
            data: {
                userId, deliveryId, LocalId
            }
        })
        return NextResponse.json(newScore)
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