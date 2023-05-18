import { NextResponse } from "next/server";
import prisma from "../../components/utils/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const body = await request.json();
  const { id, score } = body;

  if (!id || typeof score !== "number") {
    return new NextResponse("No data provided", {
      status: 400,
    });
  }

  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return new NextResponse("Unauthorized access detected", {
      status: 401,
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user)
    return new NextResponse("Could not find user", {
      status: 500,
    });

  try {
    const newScore = await prisma.score.create({
      data: {
        value: score,
        userId: user?.id,
        questionId: id,
      },
    });
    return NextResponse.json(newScore);
  } catch (error) {
    return new NextResponse("Could not save this score to database", {
      status: 400,
    });
  }
}
