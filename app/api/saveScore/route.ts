import { NextResponse } from "next/server";
import prisma from "../../components/utils/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const body = await request.json();
  const { firstQuestionId, score } = body;

  if (!firstQuestionId || typeof score !== "number") {
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
      status: 401,
    });

  try {
    const newScore = await prisma.score.create({
      data: {
        value: score,
        userId: user.id,
        questionId: firstQuestionId,
      },
    });

    return NextResponse.json("succeeded");
  } catch (error) {
    return new NextResponse("Something went wrong", {
      status: 502,
    });
  }
}
