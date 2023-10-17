import { NextResponse, NextRequest } from "next/server";
import { decode } from 'jsonwebtoken';

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|/login).*)",
  ],
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const cookieStore = request.cookies;
//   estas rutas son a las que se les permite acceder sin token
  if (['/', '/login', '/users/register', '/deliverys/register', '/sellers/register', '/api/login', '/api/deliverys', '/api/users'].includes(request.nextUrl.pathname)) {
    return response;
  }

  try {
    const token = cookieStore.get("token")?.value;

    if (!token) {
      throw Error("need token");
    }

    const decodedToken: any = decode(token)
    // si la ruta comienza con /search y el rol del user no es 'user' no lo deja ver
    if (request.nextUrl.pathname.startsWith("/search")) {
      if (decodedToken.rol !== 'user') {
        throw Error("unauthorized");
      }
      return response;
    }

    // // Si la ruta comienza con /users y el id de la url no es el mismo del usuario
    // // no lo deja ver
    if (request.nextUrl.pathname.startsWith("/users")) {
      // Obtén el id del usuario desde la ruta
      const userIdFromPath = Number(request.nextUrl.pathname.split("/")[2]);
      // Compara el id del usuario en la ruta con el id en el token
      if (decodedToken.id !== userIdFromPath || decodedToken.rol !== 'user') {
        throw Error("unauthorized");
      }
      return response;
    }

    if (request.nextUrl.pathname.startsWith("/deliverys")) {
      // Obtén el id del usuario desde la ruta
      const IdFromPath = Number(request.nextUrl.pathname.split("/")[2]);
      // Compara el id del usuario en la ruta con el id en el token
      if (decodedToken.id !== IdFromPath || decodedToken.rol !== 'delivery') {
        throw Error("unauthorized");
      }
      return response;
    }

  } catch (err: any) {
    //en caso de error
     return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
