import getCurrentUser from "@/app/components/utils/apiUtils";
import { NextResponse } from "next/server";
import prisma from "@/app/components/utils/prismadb";

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

  prisma.question.update({
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

  const answer = {
    id: params.id,
    year: res.year,
    coordinates: {
      lat: parseFloat(res.lat),
      lng: parseFloat(res.lng),
    },
  };
  // const answer: Answer = {
  //   id: params.id,
  //   year: 1999,
  //   coordinates: {
  //     lat: 35.309999111709146,
  //     lng: 23.537216886414832,
  //   },
  // };
  //   const body = await request.json();
  //   const { email, name, password } = body;

  //   const hashedPassword = await bcrypt.hash(password, 12);

  //   const user = await prisma.user.create({
  //     data: {
  //       email,
  //       name,
  //       hashedPassword,
  //     },
  //   });

  return NextResponse.json(answer);
}
