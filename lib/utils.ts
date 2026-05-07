import { NextResponse } from "next/server";

export function formatFees(fees: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(fees);
}

export function handleApiError(error: unknown) {
  console.error("API Error:", error);
  const message =
    error instanceof Error ? error.message : "An unexpected error occurred";
  return NextResponse.json(
    { error: "Internal server error", message },
    { status: 500 }
  );
}

export function validateRequired(
  data: Record<string, unknown>,
  fields: string[]
): string | null {
  for (const field of fields) {
    if (!data[field]) return `${field} is required`;
  }
  return null;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
