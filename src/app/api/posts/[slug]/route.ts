import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";

export async function GET(req: NextRequest, { params }: { params: any }) {
  const { slug } = params;
  try {
    const post = await prisma.post.findUnique({
      where: {
        slug,
      },
      include: {
        user: true,
      },
    });
    return new NextResponse(JSON.stringify({ post }), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify({ err }), { status: 500 });
  }
}
