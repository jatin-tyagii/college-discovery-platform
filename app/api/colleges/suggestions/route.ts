import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";

    if (q.length < 2) return NextResponse.json([]);

    const colleges = await prisma.college.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { city: { contains: q, mode: "insensitive" } },
          { state: { contains: q, mode: "insensitive" } },
        ],
      },
      take: 6,
      orderBy: { rating: "desc" },
      select: {
        id: true,
        name: true,
        city: true,
        state: true,
        type: true,
        nirf: true,
        fees: true,
      },
    });

    return NextResponse.json(colleges);
  } catch (error) {
    return handleApiError(error);
  }
}
