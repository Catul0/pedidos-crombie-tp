import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

interface Params {
	params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
	try {
		const product = await prisma.product.findMany({
			where: {
				id: Number(params.id),
			},
		});
		if (!product) {
			return NextResponse.json(
				{
					message: "Product not found",
				},
				{
					status: 404,
				}
			);
		}
		return NextResponse.json(product);
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
