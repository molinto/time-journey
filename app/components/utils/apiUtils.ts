import prisma from "./prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route(to-remove)";
import { getServerSession } from "next-auth";

export default async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      throw new Error("No session");
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      throw new Error("User not found");
    }

    return currentUser;
  } catch (error) {
    return null;
  }
}
