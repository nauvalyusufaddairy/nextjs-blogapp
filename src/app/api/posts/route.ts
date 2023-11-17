import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";

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
