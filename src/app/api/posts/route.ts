import prisma from "@/utils/connect";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") ?? "1";
  const pageInt = parseInt(page);
  const POST_PER_PAGE = 2;

  try {
    const posts = await prisma.post.findMany({
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (pageInt - 1),
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
