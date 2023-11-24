import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

interface Params {
	params: { id: string };
}
export async function GET(request: Request, { params }: Params) {
	try {
		const orders= await prisma.order.findFirst({
			where: {
				deliveryId: Number(params.id),
				status: {
					notIn: ['RECIBIDO', 'FINALIZADO'],
				},
			},
		});
		return NextResponse.json(orders);
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
