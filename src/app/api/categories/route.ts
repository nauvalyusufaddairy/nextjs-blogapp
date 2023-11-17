import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";
export async function GET() {
  try {
    const res = await prisma.category.findMany();
    return new NextResponse(JSON.stringify({ res }), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify({ err }), { status: 500 });
  }
}
