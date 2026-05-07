import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const college = await prisma.college.findUnique({
      where: { id: params.id },
      include: {
        courses: { orderBy: { name: "asc" } },
        reviews: {
          include: { user: { select: { id: true, name: true } } },
          orderBy: { createdAt: "desc" },
        },
        exams: {
          include: { exam: true },
          orderBy: { cutoff: "asc" },
        },
      },
    });

    if (!college) {
      return NextResponse.json({ error: "College not found" }, { status: 404 });
    }

    return NextResponse.json(college);
  } catch (error) {
    return handleApiError(error);
  }
}
