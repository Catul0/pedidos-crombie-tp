import { NextResponse } from "next/server";
import { Prisma } from '@prisma/client'
import { prisma } from '@/libs/prisma'


export async function GET() {
    try {
        const score = await prisma.score.findMany()
        return NextResponse.json(score)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message
            }, {
                status: 500,
            })
        }
    }
}

export async function POST(request: Request) {

    try {
        const { 
            userId,
            score,
            deliveryId,
            localId
        } = await request.json()
        const newScore = await prisma.score.create({
            data: {
                userId, score, deliveryId, localId
            }
        })
        return NextResponse.json(newScore)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({
                message: error.message
            }, { status: 404, })
        }
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message
            }, {
                status: 500,
            })
        }
    }
}