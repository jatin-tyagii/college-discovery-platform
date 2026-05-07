import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search   = searchParams.get("search") || "";
    const duration = searchParams.get("duration") || "";
    const maxFees  = searchParams.get("maxFees") || "";
    const page     = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit    = 12;
    const skip     = (page - 1) * limit;

    const where: any = {};
    if (search) where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { college: { name: { contains: search, mode: "insensitive" } } },
    ];
    if (duration) where.duration = parseInt(duration);
    if (maxFees)  where.fees = { lte: parseInt(maxFees) };

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where, skip, take: limit,
        orderBy: { name: "asc" },
        include: {
          college: {
            select: { id: true, name: true, city: true, state: true, type: true, rating: true, nirf: true }
          }
        }
      }),
      prisma.course.count({ where }),
    ]);

    return NextResponse.json({ courses, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    return handleApiError(error);
  }
}
