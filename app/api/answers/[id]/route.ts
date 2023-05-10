import { NextResponse } from "next/server";

interface Params {
  params: {
    id: string;
  };
}
export async function GET(request: Request, { params }: Params) {
  const answer: Answer = {
    id: params.id,
    year: 1999,
    coordinates: {
      lat: 35.309999111709146,
      lng: 23.537216886414832,
    },
  };
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
