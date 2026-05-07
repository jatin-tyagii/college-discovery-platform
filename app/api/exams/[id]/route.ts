import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const exam = await prisma.exam.findUnique({
      where: { id: params.id },
      include: {
        colleges: {
          include: {
            college: {
              select: { id: true, name: true, city: true, state: true, type: true, rating: true, nirf: true, fees: true, placementPct: true }
            }
          },
          orderBy: { cutoff: "asc" }
        }
      }
    });
    if (!exam) return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    return NextResponse.json(exam);
  } catch (error) {
    return handleApiError(error);
  }
}
