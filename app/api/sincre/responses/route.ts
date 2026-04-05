import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("sincre_responses")
      // @ts-ignore - Supabase types will be generated after first deploy
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to fetch responses" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.error("Error fetching responses:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "Response ID is required" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { error } = await supabase
      .from("sincre_responses")
      // @ts-ignore - Supabase types will be generated after first deploy
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to delete response" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error deleting response:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
