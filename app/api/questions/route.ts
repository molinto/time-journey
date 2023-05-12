import { NextResponse } from "next/server";
import prisma from "../../components/utils/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user?.email;
  const questions: GameQuestion[] = [
    { id: "1", src: "baklazhan" },
    { id: "2", src: "two" },
    { id: "3", src: "three" },
    { id: "4", src: "pes" },
    { id: "5", src: "kot" },
  ];

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

  return NextResponse.json(questions);
}
