import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { collegeIds } = await req.json();

    if (!collegeIds || !Array.isArray(collegeIds) || collegeIds.length === 0) {
      return NextResponse.json({ error: "College IDs required" }, { status: 400 });
    }

    if (collegeIds.length > 3) {
      return NextResponse.json({ error: "Maximum 3 colleges allowed" }, { status: 400 });
    }

    const colleges = await prisma.college.findMany({
      where: { id: { in: collegeIds } },
      include: {
        courses: { select: { name: true }, orderBy: { name: "asc" } },
        exams: { include: { exam: { select: { name: true } } } },
      },
    });

    // Return in same order as requested
    const ordered = collegeIds
      .map(id => colleges.find(c => c.id === id))
      .filter(Boolean);

    return NextResponse.json(ordered);
  } catch (error) {
    return handleApiError(error);
  }
}
