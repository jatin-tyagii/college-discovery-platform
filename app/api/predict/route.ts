import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { exam, rank, category } = body;

    if (!exam || !rank || !category) {
      return NextResponse.json({ error: "exam, rank and category are required" }, { status: 400 });
    }

    const rankNum = parseInt(rank);
    if (isNaN(rankNum) || rankNum < 1) {
      return NextResponse.json({ error: "Invalid rank. Must be a positive number." }, { status: 400 });
    }

    // Category multiplier — relaxed cutoffs for reserved categories
    const categoryMultiplier: Record<string, number> = {
      General: 1,
      OBC: 1.5,
      SC: 2.5,
      ST: 3.5,
    };
    const multiplier = categoryMultiplier[category] || 1;
    const effectiveRank = Math.floor(rankNum / multiplier);

    let where: any = {};
    let message = "";
    let tier = "";

    // ─── JEE ADVANCED ────────────────────────────────────
    if (exam === "JEE Advanced") {
      if (effectiveRank <= 100) {
        tier = "IIT — Top Branch";
        message = `With rank #${rankNum} in JEE Advanced (${category}), you are eligible for top IITs in Computer Science, Electrical, or Mechanical.`;
        where = { name: { in: ["IIT Bombay", "IIT Delhi", "IIT Madras", "IIT Kanpur"] } };
      } else if (effectiveRank <= 500) {
        tier = "IIT — Good Branch";
        message = `With rank #${rankNum}, you can get into IITs with good branches like CS, EE, or Chemical at top institutes.`;
        where = { name: { in: ["IIT Bombay", "IIT Delhi", "IIT Madras", "IIT Kanpur", "IIT Kharagpur", "IIT Roorkee"] } };
      } else if (effectiveRank <= 2000) {
        tier = "IIT — Available Branches";
        message = `With rank #${rankNum}, you can get into most IITs but branch options may be limited.`;
        where = { name: { contains: "IIT", mode: "insensitive" } };
      } else if (effectiveRank <= 10000) {
        tier = "NIT — Top Branches";
        message = `With rank #${rankNum}, NIT Trichy, NIT Surathkal, and NIT Warangal in top branches are within reach.`;
        where = { name: { in: ["NIT Trichy", "NIT Surathkal", "NIT Warangal", "NIT Calicut"] } };
      } else if (effectiveRank <= 25000) {
        tier = "NIT — Good Options";
        message = `With rank #${rankNum}, many NITs and good private colleges are excellent options for you.`;
        where = { name: { in: ["NIT Allahabad", "NIT Jaipur", "Delhi Technological University", "NSUT Delhi"] } };
      } else {
        tier = "Private Colleges";
        message = `With rank #${rankNum}, top private colleges like BITS Pilani, VIT, and Manipal are great options.`;
        where = { type: "Private", name: { in: ["BITS Pilani", "VIT Vellore", "Manipal Institute of Technology", "Thapar Institute of Engineering"] } };
      }
    }

    // ─── JEE MAIN ────────────────────────────────────────
    else if (exam === "JEE Main") {
      if (effectiveRank <= 5000) {
        tier = "Top NITs";
        message = `With rank #${rankNum} in JEE Main (${category}), you can get into top NITs like Trichy, Surathkal, and Warangal.`;
        where = { name: { in: ["NIT Trichy", "NIT Surathkal", "NIT Warangal", "NIT Calicut"] } };
      } else if (effectiveRank <= 15000) {
        tier = "Good NITs";
        message = `With rank #${rankNum}, NITs in Allahabad, Jaipur, and top state colleges are great choices.`;
        where = { name: { in: ["NIT Allahabad", "NIT Jaipur", "Delhi Technological University", "NSUT Delhi"] } };
      } else if (effectiveRank <= 35000) {
        tier = "State + Private";
        message = `With rank #${rankNum}, good state colleges like DTU and NSUT plus top private colleges are available.`;
        where = { OR: [{ name: { in: ["Delhi Technological University", "NSUT Delhi", "Jadavpur University", "Anna University"] } }, { type: "Private" }] };
      } else {
        tier = "Private Colleges";
        message = `With rank #${rankNum}, focus on top private colleges like VIT, Manipal, and Thapar which have excellent placements.`;
        where = { type: "Private", coursesOffered: { has: "B.Tech" } };
      }
    }

    // ─── CAT ─────────────────────────────────────────────
    else if (exam === "CAT") {
      // For CAT, rank is actually percentile
      const percentile = rankNum;
      if (percentile >= 99) {
        tier = "IIM ABC";
        message = `With ${percentile} percentile in CAT, you are eligible for IIM Ahmedabad, Bangalore, and Calcutta. Exceptional score!`;
        where = { name: { in: ["IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta"] } };
      } else if (percentile >= 97) {
        tier = "Top IIMs + Top Private";
        message = `With ${percentile} percentile, IIM ABC calls are possible. XLRI, SP Jain, MDI are excellent alternatives.`;
        where = { name: { in: ["IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta", "XLRI Jamshedpur", "SP Jain Institute of Management", "MDI Gurgaon"] } };
      } else if (percentile >= 94) {
        tier = "Top Private B-Schools";
        message = `With ${percentile} percentile, XLRI, SP Jain, MDI, and IMT Ghaziabad are strong options for you.`;
        where = { name: { in: ["XLRI Jamshedpur", "SP Jain Institute of Management", "MDI Gurgaon", "IMT Ghaziabad"] } };
      } else if (percentile >= 90) {
        tier = "Good MBA Colleges";
        message = `With ${percentile} percentile, IMT Ghaziabad and other good B-schools are within reach.`;
        where = { name: { in: ["IMT Ghaziabad", "MDI Gurgaon"] } };
      } else {
        tier = "MAT / State MBA";
        message = `With ${percentile} percentile, consider appearing for MAT as well. Good state MBA colleges are available.`;
        where = { coursesOffered: { has: "MBA" }, type: "Private" };
      }
    }

    // ─── NEET ─────────────────────────────────────────────
    else if (exam === "NEET") {
      if (effectiveRank <= 50) {
        tier = "AIIMS Delhi";
        message = `With rank #${rankNum} in NEET (${category}), you can aim for AIIMS Delhi — the pinnacle of medical education in India.`;
        where = { name: "AIIMS Delhi" };
      } else if (effectiveRank <= 200) {
        tier = "AIIMS + CMC";
        message = `With rank #${rankNum}, AIIMS Delhi and CMC Vellore are both realistic targets. Excellent score!`;
        where = { name: { in: ["AIIMS Delhi", "CMC Vellore"] } };
      } else if (effectiveRank <= 1000) {
        tier = "Top Medical Colleges";
        message = `With rank #${rankNum}, CMC Vellore and top government medical colleges are excellent options.`;
        where = { name: { in: ["CMC Vellore", "AIIMS Delhi"] } };
      } else {
        tier = "Good Medical Colleges";
        message = `With rank #${rankNum}, many good government and private medical colleges are available across India.`;
        where = { coursesOffered: { has: "MBBS" } };
      }
    }

    // ─── GATE ─────────────────────────────────────────────
    else if (exam === "GATE") {
      message = `With GATE score ${rankNum}, M.Tech admissions at IITs and NITs are excellent options. IITs prefer scores above 750.`;
      tier = rankNum >= 750 ? "IIT M.Tech" : rankNum >= 600 ? "NIT M.Tech" : "Good M.Tech Colleges";
      where = rankNum >= 750
        ? { name: { contains: "IIT", mode: "insensitive" }, coursesOffered: { has: "M.Tech" } }
        : { coursesOffered: { has: "M.Tech" } };
    }

    // ─── DEFAULT ──────────────────────────────────────────
    else {
      message = `Based on your ${exam} score of ${rank}, here are the best college options for you.`;
      tier = "Recommended Colleges";
      where = { rating: { gte: 4.0 } };
    }

    const colleges = await prisma.college.findMany({
      where,
      take: 8,
      orderBy: { rating: "desc" },
      select: {
        id: true, name: true, slug: true, city: true, state: true,
        type: true, fees: true, rating: true, placementPct: true,
        avgPackage: true, nirf: true, naac: true, cutoffRank: true,
        coursesOffered: true, examName: true,
      },
    });

    return NextResponse.json({ colleges, message, tier, exam, rank: rankNum, category });
  } catch (error) {
    return handleApiError(error);
  }
}
