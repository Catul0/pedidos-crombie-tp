import { prisma } from "@/libs/prisma";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
	const { email, password } = await req.json();
	try {
		// busca user por email
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		// verifica si existe y la contra esta bien
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return NextResponse.json(
				{
					message: "Credenciales inválidas",
				},
				{
					status: 401,
				}
			);
		}

		// genera el token
		const token = sign({ userId: user.id }, "SECRETO", { expiresIn: "1h" });

		return NextResponse.json(
			{ token },
			{
				status: 200,
			}
		);
	} catch (error) {
		console.error("error de inicio de sesión:", error);
		return NextResponse.json(
			{ message: "error interno del servidor" },
			{
				status: 500,
			}
		);
	}
}
