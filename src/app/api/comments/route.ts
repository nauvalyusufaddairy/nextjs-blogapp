import { authOptions, getAuth } from "@/utils/auth";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
// get comments
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const postSlug = searchParams.get("postSlug");

    const comment = await prisma.comment.findMany({
      where: { ...(postSlug && { postSlug }) },
      include: { user: true },
    });

    return new NextResponse(JSON.stringify(comment), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}

// create a comment if user is authenticated

export async function POST(req: NextRequest, res: NextResponse) {
  const getAuthSession = await getServerSession(authOptions);

  console.log("bruh", getAuthSession);

  if (!getAuthSession) {
    return new NextResponse(
      JSON.stringify({ message: "you are not authenticated bruh" }),
      { status: 401 }
    );
  }
  try {
    const body = await req.json();
    const comment = await prisma.comment.create({
      // @ts-ignore
      data: { ...body, userEmail: getAuthSession.user?.email },
    });
    return new NextResponse(JSON.stringify(comment), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
