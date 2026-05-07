import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { handleApiError } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = (session.user as any).id;
    const saved = await prisma.savedCollege.findMany({
      where: { userId },
      include: {
        college: {
          select: {
            id: true, name: true, slug: true, city: true, state: true,
            type: true, fees: true, rating: true, reviewCount: true,
            placementPct: true, avgPackage: true, nirf: true, naac: true,
            coursesOffered: true, imageUrl: true, examName: true, cutoffRank: true,
            hostelAvailable: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(saved.map(s => s.college));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { collegeId } = await req.json();
    if (!collegeId) {
      return NextResponse.json({ error: "collegeId is required" }, { status: 400 });
    }
    const userId = (session.user as any).id;
    const saved = await prisma.savedCollege.upsert({
      where: { userId_collegeId: { userId, collegeId } },
      update: {},
      create: { userId, collegeId },
    });
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { collegeId } = await req.json();
    if (!collegeId) {
      return NextResponse.json({ error: "collegeId is required" }, { status: 400 });
    }
    const userId = (session.user as any).id;
    await prisma.savedCollege.delete({
      where: { userId_collegeId: { userId, collegeId } },
    });
    return NextResponse.json({ message: "College unsaved successfully" });
  } catch (error) {
    return handleApiError(error);
  }
}
