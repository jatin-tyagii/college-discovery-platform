import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { handleApiError, validateRequired } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Login required to post an answer" }, { status: 401 });
    }

    const body = await req.json();
    const missing = validateRequired(body, ["content"]);
    if (missing) return NextResponse.json({ error: missing }, { status: 400 });

    const userId = (session.user as any).id;

    const answer = await prisma.answer.create({
      data: { content: body.content, userId, questionId: params.id },
      include: { user: { select: { id: true, name: true } } },
    });

    // Update answer count
    await prisma.question.update({
      where: { id: params.id },
      data: { answerCount: { increment: 1 } },
    });

    return NextResponse.json(answer, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
