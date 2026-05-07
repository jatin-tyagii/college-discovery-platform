import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "overall";

    let orderBy: any = {};
    let where: any = {};

    switch (type) {
      case "engineering":
        where = { coursesOffered: { has: "B.Tech" } };
        orderBy = { nirf: "asc" };
        break;
      case "management":
        where = { coursesOffered: { has: "MBA" } };
        orderBy = { rating: "desc" };
        break;
      case "medical":
        where = { coursesOffered: { has: "MBBS" } };
        orderBy = { rating: "desc" };
        break;
      case "placement":
        orderBy = { placementPct: "desc" };
        break;
      case "fees":
        orderBy = { fees: "asc" };
        break;
      default:
        orderBy = { rating: "desc" };
    }

    const colleges = await prisma.college.findMany({
      where,
      orderBy,
      take: 30,
      select: {
        id: true, name: true, slug: true, city: true, state: true,
        type: true, fees: true, rating: true, placementPct: true,
        avgPackage: true, nirf: true, naac: true, coursesOffered: true,
        established: true, totalStudents: true,
      },
    });

    return NextResponse.json(colleges);
  } catch (error) {
    return handleApiError(error);
  }
}
