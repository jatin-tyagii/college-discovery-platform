import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const course = await prisma.course.findUnique({
      where: { id: (await params).id },
      include: {
        college: {
          select: { id: true, name: true, city: true, state: true, type: true, rating: true, nirf: true, placementPct: true, avgPackage: true }
        }
      }
    });
    if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });
    return NextResponse.json(course);
  } catch (error) {
    return handleApiError(error);
  }
}
