import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const type   = searchParams.get("type") || "";

    const where: any = {};
    if (search) where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { fullName: { contains: search, mode: "insensitive" } },
    ];
    if (type) where.type = type;

    const exams = await prisma.exam.findMany({
      where,
      orderBy: { name: "asc" },
      include: {
        _count: { select: { colleges: true } }
      }
    });

    return NextResponse.json(exams);
  } catch (error) {
    return handleApiError(error);
  }
}
