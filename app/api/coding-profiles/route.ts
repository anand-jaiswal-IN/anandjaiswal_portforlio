import { NextResponse } from "next/server"
import { getCodingProfilesData } from "@/lib/coding-profiles"

export const revalidate = 3600

export async function GET() {
  try {
    const data = await getCodingProfilesData()

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch {
    return NextResponse.json({ message: "Failed to fetch coding profiles" }, { status: 500 })
  }
}
