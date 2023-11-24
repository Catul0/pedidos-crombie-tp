import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
	try {
		const orderStatus = await prisma.order.findMany({
			where: {
				delivery: null,
				status: {
					notIn: ['RECHAZADO', 'PENDIENTE'],
				},
			},
		});
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