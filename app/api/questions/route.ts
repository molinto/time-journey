import { NextResponse } from "next/server";
import prisma from "../../components/utils/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { pickRandomItems } from "@/app/components/utils/apiUtils";
import { pipeline } from "stream";
import { stringify } from "querystring";

export async function GET(request: Request) {
  // const questions: GameQuestion[] = [
  //   { id: "1", src: "baklazhan" },
  //   { id: "2", src: "two" },
  //   { id: "3", src: "three" },
  //   { id: "4", src: "pes" },
  //   { id: "5", src: "kot" },
  // ];

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
          $expr: {
            $not: {
              $in: [{ $toObjectId: id }, "$userIDs"],
            },
          },
        },
      },
      {
        $project: {
          imageSrc: "$imageSrc",
          year: "$year",
        },
      },
      {
        $sample: { size: 5 },
      },
    ],
  });

  console.log(Object.keys(questions).length);

  if (!questions.length || Object.keys(questions).length < 5) {
    return new NextResponse("Not enough questions", {
      status: 500,
    });
  }
  return NextResponse.json(questions);
}
