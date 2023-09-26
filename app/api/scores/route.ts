import { NextResponse } from "next/server";
import prisma from "../../components/utils/prismadb";
import { Ranking } from "@/types";

export const revalidate = 0;

// eslint-disable-next-line no-unused-vars
export async function GET(request: Request) {
  const scores = await prisma.score.findMany({
    orderBy: [
      {
        value: "desc",
      },
    ],
    take: 10,
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
