import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const cat = searchParams.get("cat");
  const POST_PER_PAGE = 2;
  try {
    const query = {
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (page - 1),
      where: {
        ...(cat && { catSlug: cat }),
      },
    };
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);

    return new NextResponse(JSON.stringify({ posts, count }), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify({ err }), { status: 500 });
  }
}

// create a post if user is authenticated

export async function POST(req: NextRequest, res: NextResponse) {
  const getAuthSession = await getServerSession(authOptions);

  if (!getAuthSession) {
    return new NextResponse(
      JSON.stringify({ message: "you are not authenticated bruh" }),
      { status: 401 }
    );
  }
  try {
    const body = await req.json();
    const comment = await prisma.post.create({
      // @ts-ignore
      data: { ...body, userEmail: getAuthSession.user?.email },
    });
    console.log(comment);
    return new NextResponse(JSON.stringify(comment), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
