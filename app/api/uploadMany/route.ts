import { NextResponse } from "next/server";
import prisma from "../../components/utils/prismadb";
import { rawData } from "@/lib/originalQuestions";
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

  if (!user?.email) {
    return new NextResponse("User not found", {
      status: 401,
    });
  }
  const questions = rawData.map((q) => {
    return {
      imageSrc: q.URL,
      lat: q.Location.lat.toString(),
      lng: q.Location.lng.toString(),
      year: parseInt(q.Year),
      description: q.Description,
      license: q.License,
      // users: {
      //   connect: {
      //     id: user.id,
      //   },
      // },
    };
  });
  const kek = await prisma.question.createMany({
    data: questions,
  });
  //   const question = await prisma.question.create({
  //     data: {
  //       imageSrc: imageSrc,
  //       lat: lat,
  //       lng: lng,
  //       year: year,
  //       description: description,
  //       author: author,
  //       users: {
  //         connect: { id: user.id },
  //       },
  //     },
  //   });

  return new NextResponse("kek");
}
