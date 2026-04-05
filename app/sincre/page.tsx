"use client"

import { useState } from "react"
import { DM_Sans, DM_Serif_Display } from "next/font/google"

const dmSans = DM_Sans({ subsets: ["latin"] })
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: ["400"] })

type FormData = {
  name: string
  company: string
  proximo_distante: number
  conservador_inovador: number
  serio_descontraido: number
  humano_tecnico: number
  complexo_simples: number
  feminino_masculino: number
  leve_pesado: number
  agressivo_amigavel: number
  popular_elitizado: number
  moderno_tradicional: number
  animado_tranquilo: number
  comum_diferente: number
}

const attributes = [
  { key: "proximo_distante", left: "Próximo", right: "Distante" },
  { key: "conservador_inovador", left: "Conservador", right: "Inovador" },
  { key: "serio_descontraido", left: "Sério", right: "Descontraído" },
  { key: "humano_tecnico", left: "Humano", right: "Técnico" },
  { key: "complexo_simples", left: "Complexo", right: "Simples" },
  { key: "feminino_masculino", left: "Feminino", right: "Masculino" },
  { key: "leve_pesado", left: "Leve", right: "Pesado" },
  { key: "agressivo_amigavel", left: "Agressivo", right: "Amigável" },
  { key: "popular_elitizado", left: "Popular", right: "Elitizado" },
  { key: "moderno_tradicional", left: "Moderno", right: "Tradicional" },
  { key: "animado_tranquilo", left: "Animado", right: "Tranquilo" },
  { key: "comum_diferente", left: "Comum", right: "Diferente" },
]

export default function SincrePage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    proximo_distante: 3,
    conservador_inovador: 3,
    serio_descontraido: 3,
    humano_tecnico: 3,
    complexo_simples: 3,
    feminino_masculino: 3,
    leve_pesado: 3,
    agressivo_amigavel: 3,
    popular_elitizado: 3,
    moderno_tradicional: 3,
    animado_tranquilo: 3,
    comum_diferente: 3,
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSliderChange = (key: string, value: number) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/sincre/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        alert("Erro ao enviar respostas. Tenta novamente.")
      }
    } catch (error) {
      alert("Erro ao enviar respostas. Tenta novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className={`min-h-screen bg-[#FAF8F4] ${dmSans.className}`}>
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className={`text-6xl mb-6 text-[#1A1714] ${dmSerif.className}`}>
              SINCRE
            </h1>
            <p className="text-xl text-[#1A1714]/70 mb-8">
              Obrigado pela tua participação!
            </p>
            <p className="text-[#1A1714]/60">
              As tuas respostas foram registadas com sucesso.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-[#FAF8F4] ${dmSans.className}`}>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className={`text-6xl md:text-7xl mb-6 text-[#1A1714] ${dmSerif.className}`}>
              SINCRE
            </h1>
            <h2 className="text-2xl md:text-3xl mb-8 text-[#D85A30] font-light">
              Pesquisa de Personalidade de Marca
            </h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg leading-relaxed text-[#1A1714]/80">
                O nome SINCRE vem de <em>sincretismo</em> — do grego <em>sygkretismós</em>,
                que significava a reunião dos povos de Creta em torno de um objetivo comum.
              </p>
              <p className="text-lg leading-relaxed text-[#1A1714]/80 mt-4">
                Acreditamos que design não apaga identidades, ele as enaltece.
                Aproximamos. Conectamos. Harmonizamos.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Optional fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#1A1714]/70 mb-2">
                  Nome (opcional)
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#1A1714]/20 bg-white text-[#1A1714] focus:outline-none focus:ring-2 focus:ring-[#D85A30]/50"
                  placeholder="O teu nome"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1714]/70 mb-2">
                  Empresa / Contexto (opcional)
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#1A1714]/20 bg-white text-[#1A1714] focus:outline-none focus:ring-2 focus:ring-[#D85A30]/50"
                  placeholder="A tua empresa ou contexto"
                />
              </div>
            </div>

            {/* Slider attributes */}
            <div className="space-y-10">
              <h3 className="text-xl font-medium text-[#1A1714] mb-6">
                Como percebes a personalidade do SINCRE?
              </h3>

              {attributes.map((attr) => (
                <div key={attr.key} className="space-y-3">
                  <div className="flex items-center justify-between gap-8">
                    <span className="text-[#1A1714] font-medium text-right flex-1">
                      {attr.left}
                    </span>
                    <div className="flex-[2] flex flex-col items-center">
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={formData[attr.key as keyof FormData] as number}
                        onChange={(e) =>
                          handleSliderChange(attr.key, parseInt(e.target.value))
                        }
                        className="w-full h-2 bg-[#1A1714]/10 rounded-lg appearance-none cursor-pointer slider-sincre"
                      />
                      <div className="flex justify-between w-full text-xs text-[#1A1714]/50 mt-2">
                        <span>Muito</span>
                        <span>Um pouco</span>
                        <span>Neutro</span>
                        <span>Um pouco</span>
                        <span>Muito</span>
                      </div>
                    </div>
                    <span className="text-[#1A1714] font-medium text-left flex-1">
                      {attr.right}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit button */}
            <div className="pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#D85A30] text-white py-4 rounded-lg font-medium text-lg hover:bg-[#D85A30]/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "A enviar..." : "Enviar respostas"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Custom slider styles */}
      <style jsx>{`
        .slider-sincre::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          background: #D85A30;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s;
        }

        .slider-sincre::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .slider-sincre::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: #D85A30;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }

        .slider-sincre::-moz-range-thumb:hover {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  )
}
