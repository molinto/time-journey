import { NextResponse } from "next/server";
import prisma from "../../components/utils/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
  //   const session = await getServerSession(authOptions);
  //   const email = session?.user?.email;
  //   if (!email) {
  //     return new NextResponse("Unauthorized access detected", {
  //       status: 401,
  //     });
  //   }
  //   const user = await prisma.user.findUnique({
  //     where: {
  //       email: email,
  //     },
  //   });

  //   if (!user) {
  //     return new NextResponse("User not found", {
  //       status: 500,
  //     });
  //   }

  console.log("kek");
  const scores = await prisma.score.findMany({
    take: 10,
    orderBy: [
      {
        value: "desc",
      },
    ],

    select: {
      value: true,
      id: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  const formattedScores: Ranking[] = scores.map((score) => {
    const name = score.user.name ? score.user.name : "unknown";
    const splittedName = name.split(" ");
    const formattedName =
      splittedName.length === 1
        ? splittedName[0]
        : `${splittedName[0]} ${splittedName[1].slice(0, 1)}.`;

    return {
      value: score.value,
      name: formattedName,
      id: score.id,
    };
  });

  return NextResponse.json(formattedScores);
}
