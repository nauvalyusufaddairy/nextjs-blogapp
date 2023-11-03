import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const POST_PER_PAGE = 2;
  const { searchParams } = new URL(req.url);
  // @ts-ignore
  const page = searchParams.get("page") as number;

  try {
    const categories = await prisma.post.findMany({
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (page - 1),
    });
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (e) {
    console.log("error euy", e);
    return new NextResponse(
      JSON.stringify({ message: "something went wrong" }),
      { status: 500 }
    );
  }
}
