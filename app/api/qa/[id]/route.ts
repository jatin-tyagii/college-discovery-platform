import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const question = await prisma.question.findUnique({
      where: { id: params.id },
      include: {
        user: { select: { id: true, name: true } },
        answers: {
          include: { user: { select: { id: true, name: true } } },
          orderBy: [{ isAccepted: "desc" }, { helpfulCount: "desc" }, { createdAt: "asc" }],
        },
      },
    });

    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    // Increment views
    await prisma.question.update({
      where: { id: params.id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json(question);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { solved } = await req.json();
    const question = await prisma.question.update({
      where: { id: params.id },
      data: { solved },
    });
    return NextResponse.json(question);
  } catch (error) {
    return handleApiError(error);
  }
}
