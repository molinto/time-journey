import { NextResponse } from "next/server";
import prisma from "../../components/utils/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
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

  if (!user) {
    return new NextResponse("User not found", {
      status: 500,
    });
  }

  const id = user.id;

  const questions = await prisma.question.aggregateRaw({
    pipeline: [
      {
        $match: {
          $or: [
            {
              userIDs: {
                $exists: false,
              },
            },
            {
              $expr: {
                $not: {
                  $in: [{ $toObjectId: id }, "$userIDs"],
                },
              },
            },
          ],
        },
      },
      {
        $project: {
          id: {
            $toString: "$_id",
          },
          imageSrc: "$imageSrc",
          year: "$year",
        },
      },
      {
        $sample: { size: 5 },
      },
    ],
  });

  if (!questions.length || Object.keys(questions).length < 5) {
    return new Response("Not enough questions", {
      status: 400,
      statusText: "We are sorry. There is not enough questions left for you.",
    });
  }
  return NextResponse.json(questions);
}
