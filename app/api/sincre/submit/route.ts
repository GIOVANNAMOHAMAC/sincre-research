import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/types/supabase"

type SincreResponseInsert = Database['public']['Tables']['sincre_responses']['Insert']

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      "proximo_distante",
      "conservador_inovador",
      "serio_descontraido",
      "humano_tecnico",
      "complexo_simples",
      "feminino_masculino",
      "leve_pesado",
      "agressivo_amigavel",
      "popular_elitizado",
      "moderno_tradicional",
      "animado_tranquilo",
      "comum_diferente",
    ]

    for (const field of requiredFields) {
      if (!body[field] || body[field] < 1 || body[field] > 5) {
        return NextResponse.json(
          { error: `Invalid value for ${field}` },
          { status: 400 }
        )
      }
    }

    const supabase = await createClient()

    const insertData: SincreResponseInsert = {
      name: body.name || null,
      company: body.company || null,
      proximo_distante: body.proximo_distante,
      conservador_inovador: body.conservador_inovador,
      serio_descontraido: body.serio_descontraido,
      humano_tecnico: body.humano_tecnico,
      complexo_simples: body.complexo_simples,
      feminino_masculino: body.feminino_masculino,
      leve_pesado: body.leve_pesado,
      agressivo_amigavel: body.agressivo_amigavel,
      popular_elitizado: body.popular_elitizado,
      moderno_tradicional: body.moderno_tradicional,
      animado_tranquilo: body.animado_tranquilo,
      comum_diferente: body.comum_diferente,
    }

    const { data, error } = await supabase
      .from("sincre_responses")
      // @ts-ignore - Supabase types will be generated after first deploy
      .insert(insertData)
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to save response" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.error("Error submitting form:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
