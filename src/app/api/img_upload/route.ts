import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function POST(req: NextRequest) {
  const client = new S3Client({});
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;
  if (!file) {
    return new NextResponse(JSON.stringify({ message: "file is empty" }), {
      status: 404,
    });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fixedName = file.name.replace(/[^a-zA-Z0-9-_.]/g, "_");

  try {
    const res = await client.send(
      new PutObjectCommand({
        Bucket: "plaidpost",
        Key: "blogapp/" + fixedName,
        Body: buffer,
      })
    );

    return new NextResponse(
      JSON.stringify({
        dataa: res,
        url: `https://plaidpost.s3.amazonaws.com/blogapp/${fixedName}`,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
