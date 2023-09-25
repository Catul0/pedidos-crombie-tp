import { NextResponse } from "next/server";
import {Prisma} from '@prisma/client'
import {prisma} from '@/libs/prisma'


export async function GET() {
    try {
        const product = await prisma.product.findMany()
        return NextResponse.json(product)
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
        const {productName, description, price, image, sellerId} = await request.json()
        const newProduct = await prisma.product.create({
            data: {
                productName, description, price, image, sellerId
            }
        })
        return NextResponse.json(newProduct)
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