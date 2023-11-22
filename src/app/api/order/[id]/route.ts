import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
	params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
	try {
		const orderStatus = await prisma.order.findFirst({
			where: {
				id: Number(params.id),
			},
		});
		if (!orderStatus) {
			return NextResponse.json(
				{
					message: "OrderStatus not found",
				},
				{
					status: 404,
				}
			);
		}
		return NextResponse.json(orderStatus);
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json(
				{
					message: error.message,
				},
				{
					status: 500,
				}
			);
		}
	}
}

export async function DELETE(request: Request, { params }: Params) {
	try {
		const deletedOrderStatus = await prisma.order.delete({
			where: {
				id: Number(params.id),
			},
		});
		if (!deletedOrderStatus)
			return NextResponse.json(
				{
					message: "OrderStatus not found",
				},
				{
					status: 404,
				}
			);
		return NextResponse.json(deletedOrderStatus);
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				return NextResponse.json(
					{
						message: "OrderStatus not found",
					},
					{
						status: 404,
					}
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
				}
			);
		}
	}
}

export async function PUT(request: Request, { params }: Params) {
	try {
		const { status, products, sellerId, userId, deliveryId } = await request.json();
		const updatedOrderStatus = await prisma.order.update({
			where: {
				id: Number(params.id),
			},
			data: {
				status,
				products,
				sellerId,
				userId,
				deliveryId,
			},
		});
		return NextResponse.json(updatedOrderStatus);
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return NextResponse.json({
				status: 404,
			});
		}
		if (error instanceof Error) {
			return NextResponse.json(
				{
					message: error.message,
				},
				{
					status: 500,
				}
			);
		}
	}
}
