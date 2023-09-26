import getCurrentUser from "@/app/components/utils/apiUtils";
import { NextResponse } from "next/server";
import prisma from "@/app/components/utils/prismadb";
import { GameAnswer } from "@/types";

interface Params {
  params: {
    id: string;
  };
}
export async function GET(request: Request, { params }: Params) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse("Unauthorized", {
      status: 401,
      statusText: "You have to be logged in",
    });
  }

  const res = await prisma.question.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!res) {
    return new NextResponse("Not found", {
      status: 500,
      statusText: "Question not found",
    });
  }

  const updatedQuestion = await prisma.question.update({
    where: {
      id: params.id,
    },
    data: {
      users: {
        connect: {
          id: currentUser.id,
        },
      },
    },
  });

  const answer: GameAnswer = {
    id: params.id,
    year: res.year,
    coordinates: {
      lat: parseFloat(res.lat),
      lng: parseFloat(res.lng),
    },
    description: res.description,
    license: res.license,
  };

  return NextResponse.json(answer);
}
