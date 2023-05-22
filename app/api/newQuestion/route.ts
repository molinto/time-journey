import { NextResponse } from "next/server";
import prisma from "../../components/utils/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    return new NextResponse("Unauthorized access detected", {
      status: 401,
    });
  }

  const body = await request.json();
  const { imageSrc, lat, lng, description, license, year } = body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user?.email) {
    return new NextResponse("User not found", {
      status: 401,
    });
  }

  const question = await prisma.question.create({
    data: {
      imageSrc: imageSrc,
      lat: lat,
      lng: lng,
      year: year,
      description: description,
      license: license,
      users: {
        connect: { id: user.id },
      },
    },
  });

  return new NextResponse("success");
}
