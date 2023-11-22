import { prisma } from "@/libs/prisma";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
	const { email, password } = await req.json();
	try {
		// busca el perfil del local por email
		const localProfile = await prisma.localProfile.findUnique({
			where: {
				email: email,
			},
		});

		// verifica si existe y la contra esta bien
		if (!localProfile || !(await bcrypt.compare(password, localProfile.password))) {
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
		const token = sign({ localProfileId: localProfile.id }, "LOCALSECRETO", {
			expiresIn: "1h",
		});

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
