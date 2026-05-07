import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { handleApiError, validateRequired } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sort   = searchParams.get("sort") || "recent";
    const filter = searchParams.get("filter") || "";
    const page   = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit  = 10;
    const skip   = (page - 1) * limit;

    const where: any = {};
    if (filter === "unanswered") where.answerCount = 0;
    if (filter === "solved")     where.solved = true;

    const orderBy: any =
      sort === "popular" ? { views: "desc" } :
      sort === "answers" ? { answerCount: "desc" } :
                           { createdAt: "desc" };

    const [questions, total] = await Promise.all([
      prisma.question.findMany({
        where, skip, take: limit, orderBy,
        include: {
          user: { select: { id: true, name: true } },
          _count: { select: { answers: true } },
        },
      }),
      prisma.question.count({ where }),
    ]);

    return NextResponse.json({ questions, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Login required to post a question" }, { status: 401 });
    }

    const body = await req.json();
    const missing = validateRequired(body, ["title", "content"]);
    if (missing) return NextResponse.json({ error: missing }, { status: 400 });

    const { title, content, tags = [] } = body;
    const userId = (session.user as any).id;

    const question = await prisma.question.create({
      data: { title, content, tags, userId },
      include: { user: { select: { id: true, name: true } } },
    });

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
