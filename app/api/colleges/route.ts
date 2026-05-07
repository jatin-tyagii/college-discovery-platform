import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search   = searchParams.get("search") || "";
    const state    = searchParams.get("state") || "";
    const type     = searchParams.get("type") || "";
    const course   = searchParams.get("course") || "";
    const maxFees  = searchParams.get("maxFees") || "";
    const minRating = searchParams.get("minRating") || "";
    const sort     = searchParams.get("sort") || "rating";
    const page     = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit    = 12;
    const skip     = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
        { state: { contains: search, mode: "insensitive" } },
      ];
    }
    if (state)    where.state = { equals: state };
    if (type)     where.type  = { equals: type };
    if (course)   where.coursesOffered = { has: course };
    if (maxFees)  where.fees  = { lte: parseInt(maxFees) };
    if (minRating) where.rating = { gte: parseFloat(minRating) };

    const orderBy: any =
      sort === "fees"      ? { fees: "asc" } :
      sort === "placement" ? { placementPct: "desc" } :
      sort === "ranking"   ? { nirf: "asc" } :
      sort === "name"      ? { name: "asc" } :
                             { rating: "desc" };

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where, skip, take: limit, orderBy,
        select: {
          id: true, name: true, slug: true, city: true, state: true,
          type: true, fees: true, rating: true, reviewCount: true,
          placementPct: true, avgPackage: true, nirf: true, naac: true,
          coursesOffered: true, imageUrl: true, examName: true,
          cutoffRank: true, hostelAvailable: true,
        },
      }),
      prisma.college.count({ where }),
    ]);

    return NextResponse.json({
      colleges,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return handleApiError(error);
  }
}
