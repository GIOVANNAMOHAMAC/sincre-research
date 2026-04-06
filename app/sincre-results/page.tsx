"use client"

import { useState, useEffect } from "react"
import { DM_Sans, DM_Serif_Display } from "next/font/google"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts"

const dmSans = DM_Sans({ subsets: ["latin"] })
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: ["400"] })

type Response = {
  id: string
  created_at: string
  name: string | null
  company: string | null
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
  tempo_resposta_segundos: number | null
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

const getLabel = (value: number, left: string, right: string) => {
  if (value === 1) return `Muito ${left}`
  if (value === 2) return `Um pouco ${left}`
  if (value === 3) return "Neutro"
  if (value === 4) return `Um pouco ${right}`
  if (value === 5) return `Muito ${right}`
  return "N/A"
}

const formatTempo = (segundos: number | null) => {
  if (!segundos) return "N/A"
  const mins = Math.floor(segundos / 60)
  const secs = segundos % 60
  return mins > 0 ? `${mins}min ${secs}s` : `${secs}s`
}

const getTempoCategoria = (segundos: number | null) => {
  if (!segundos) return { label: "N/A", color: "text-gray-500" }
  if (segundos < 60) return { label: "Resposta rápida", color: "text-yellow-600" }
  if (segundos <= 180) return { label: "Resposta reflexiva", color: "text-green-600" }
  return { label: "Resposta detalhada", color: "text-blue-600" }
}

export default function SincreResultsPage() {
  const [responses, setResponses] = useState<Response[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // Simple password protection (you should use env variable in production)
  const RESULTS_PASSWORD = "sincre2024"

  useEffect(() => {
    const savedAuth = sessionStorage.getItem("sincre_auth")
    if (savedAuth === "true") {
      setIsAuthenticated(true)
      fetchResponses()
    } else {
      setIsLoading(false)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === RESULTS_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem("sincre_auth", "true")
      fetchResponses()
      setError("")
    } else {
      setError("Password incorreta")
    }
  }

  const fetchResponses = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/sincre/responses")
      const result = await response.json()
      if (result.success) {
        setResponses(result.data)
      }
    } catch (error) {
      console.error("Error fetching responses:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tens a certeza que queres eliminar esta resposta?")) return

    try {
      const response = await fetch(`/api/sincre/responses?id=${id}`, {
        method: "DELETE",
      })
      const result = await response.json()
      if (result.success) {
        setResponses(responses.filter((r) => r.id !== id))
      }
    } catch (error) {
      console.error("Error deleting response:", error)
    }
  }

  const exportCSV = () => {
    const headers = [
      "ID",
      "Data",
      "Nome",
      "Empresa",
      "Tempo (segundos)",
      "Tempo (formatado)",
      "Categoria Tempo",
      ...attributes.map((a) => `${a.left}/${a.right}`),
    ]

    const rows = responses.map((r) => [
      r.id,
      new Date(r.created_at).toLocaleString("pt-PT"),
      r.name || "",
      r.company || "",
      r.tempo_resposta_segundos || "",
      formatTempo(r.tempo_resposta_segundos),
      getTempoCategoria(r.tempo_resposta_segundos).label,
      ...attributes.map((a) => r[a.key as keyof Response]),
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `sincre-responses-${Date.now()}.csv`)
    link.click()
  }

  // Calculate statistics
  const calculateDistribution = (key: string) => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    responses.forEach((r) => {
      const value = r[key as keyof Response] as number
      if (value >= 1 && value <= 5) {
        counts[value as keyof typeof counts]++
      }
    })
    return [
      { value: "1", count: counts[1] },
      { value: "2", count: counts[2] },
      { value: "3", count: counts[3] },
      { value: "4", count: counts[4] },
      { value: "5", count: counts[5] },
    ]
  }

  const calculateAverage = (key: string) => {
    if (responses.length === 0) return 3
    const sum = responses.reduce(
      (acc, r) => acc + (r[key as keyof Response] as number),
      0
    )
    return sum / responses.length
  }

  const radarData = attributes.map((attr) => ({
    attribute: `${attr.left}/${attr.right}`,
    value: calculateAverage(attr.key),
  }))

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen bg-[#FAF8F4] ${dmSans.className}`}>
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-md mx-auto">
            <h1
              className={`text-5xl mb-6 text-[#1A1714] text-center ${dmSerif.className}`}
            >
              SINCRE
            </h1>
            <h2 className="text-xl mb-8 text-[#D85A30] text-center">
              Resultados da Pesquisa
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1714]/70 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#1A1714]/20 bg-white text-[#1A1714] focus:outline-none focus:ring-2 focus:ring-[#D85A30]/50"
                  placeholder="Insere a password"
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-[#D85A30] text-white py-3 rounded-lg font-medium hover:bg-[#D85A30]/90 transition"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-[#FAF8F4] ${dmSans.className}`}>
        <div className="container mx-auto px-4 py-24 text-center">
          <p className="text-[#1A1714]">A carregar...</p>
        </div>
      </div>
    )
  }

  const firstResponse = responses.length > 0 ? responses[responses.length - 1] : null
  const lastResponse = responses.length > 0 ? responses[0] : null

  // Cálculos de tempo de resposta
  const responsesComTempo = responses.filter(r => r.tempo_resposta_segundos !== null)
  const tempoMedio = responsesComTempo.length > 0
    ? Math.round(responsesComTempo.reduce((acc, r) => acc + (r.tempo_resposta_segundos || 0), 0) / responsesComTempo.length)
    : 0
  const tempoMin = responsesComTempo.length > 0
    ? Math.min(...responsesComTempo.map(r => r.tempo_resposta_segundos || 0))
    : 0
  const tempoMax = responsesComTempo.length > 0
    ? Math.max(...responsesComTempo.map(r => r.tempo_resposta_segundos || 0))
    : 0

  // Dados para scatter plot: tempo x média dos atributos
  const scatterData = responses
    .filter(r => r.tempo_resposta_segundos !== null)
    .map(r => {
      const mediaAtributos = attributes.reduce((acc, attr) =>
        acc + (r[attr.key as keyof Response] as number), 0
      ) / attributes.length
      return {
        tempo: r.tempo_resposta_segundos,
        media: mediaAtributos,
        name: r.name || 'Anônimo'
      }
    })

  return (
    <div className={`min-h-screen bg-[#FAF8F4] ${dmSans.className}`}>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className={`text-5xl mb-4 text-[#1A1714] ${dmSerif.className}`}>
            SINCRE
          </h1>
          <h2 className="text-2xl text-[#D85A30] mb-6">Resultados da Pesquisa</h2>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg border border-[#1A1714]/10">
              <p className="text-sm text-[#1A1714]/60 mb-1">Total de respostas</p>
              <p className="text-3xl font-bold text-[#1A1714]">{responses.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-[#1A1714]/10">
              <p className="text-sm text-[#1A1714]/60 mb-1">Primeira resposta</p>
              <p className="text-lg text-[#1A1714]">
                {firstResponse
                  ? new Date(firstResponse.created_at).toLocaleDateString("pt-PT")
                  : "N/A"}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-[#1A1714]/10">
              <p className="text-sm text-[#1A1714]/60 mb-1">Última resposta</p>
              <p className="text-lg text-[#1A1714]">
                {lastResponse
                  ? new Date(lastResponse.created_at).toLocaleDateString("pt-PT")
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Time Metrics */}
          {responsesComTempo.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg border border-[#D85A30]/20">
                <p className="text-sm text-[#1A1714]/60 mb-1">Tempo médio de resposta</p>
                <p className="text-3xl font-bold text-[#D85A30]">{formatTempo(tempoMedio)}</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-[#D85A30]/20">
                <p className="text-sm text-[#1A1714]/60 mb-1">Tempo mínimo</p>
                <p className="text-lg text-[#1A1714]">{formatTempo(tempoMin)}</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-[#D85A30]/20">
                <p className="text-sm text-[#1A1714]/60 mb-1">Tempo máximo</p>
                <p className="text-lg text-[#1A1714]">{formatTempo(tempoMax)}</p>
              </div>
            </div>
          )}

          <button
            onClick={exportCSV}
            className="bg-[#D85A30] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#D85A30]/90 transition"
          >
            Exportar CSV
          </button>
        </div>

        {/* Radar Chart - Overall Profile */}
        {responses.length > 0 && (
          <div className="mb-12 bg-white p-8 rounded-lg border border-[#1A1714]/10">
            <h3 className="text-2xl font-bold text-[#1A1714] mb-6">
              Perfil Geral da Marca
            </h3>
            <ResponsiveContainer width="100%" height={500}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1A1714" opacity={0.2} />
                <PolarAngleAxis
                  dataKey="attribute"
                  tick={{ fill: "#1A1714", fontSize: 12 }}
                />
                <PolarRadiusAxis angle={90} domain={[1, 5]} />
                <Radar
                  name="Média"
                  dataKey="value"
                  stroke="#D85A30"
                  fill="#D85A30"
                  fillOpacity={0.5}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Scatter Plot - Tempo x Média dos Atributos */}
        {scatterData.length > 0 && (
          <div className="mb-12 bg-white p-8 rounded-lg border border-[#1A1714]/10">
            <h3 className="text-2xl font-bold text-[#1A1714] mb-6">
              Tempo de Resposta x Média dos Atributos
            </h3>
            <p className="text-sm text-[#1A1714]/60 mb-4">
              Este gráfico mostra se existe correlação entre o tempo que a pessoa
              levou para responder e as respostas que deu (mais neutras ou mais extremas).
            </p>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis
                  type="number"
                  dataKey="tempo"
                  name="Tempo (s)"
                  label={{ value: 'Tempo de Resposta (segundos)', position: 'insideBottom', offset: -10 }}
                />
                <YAxis
                  type="number"
                  dataKey="media"
                  name="Média"
                  domain={[1, 5]}
                  label={{ value: 'Média dos Atributos', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className="bg-white p-3 border border-[#1A1714]/20 rounded shadow-lg">
                          <p className="font-medium">{data.name}</p>
                          <p className="text-sm">Tempo: {formatTempo(data.tempo)}</p>
                          <p className="text-sm">Média: {data.media.toFixed(2)}</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Scatter name="Respostas" data={scatterData} fill="#D85A30" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Individual Attribute Charts */}
        {responses.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-[#1A1714] mb-6">
              Distribuição por Atributo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {attributes.map((attr) => {
                const distribution = calculateDistribution(attr.key)
                const average = calculateAverage(attr.key)
                const label = getLabel(Math.round(average), attr.left, attr.right)

                return (
                  <div
                    key={attr.key}
                    className="bg-white p-6 rounded-lg border border-[#1A1714]/10"
                  >
                    <h4 className="text-lg font-semibold text-[#1A1714] mb-2">
                      {attr.left} — {attr.right}
                    </h4>
                    <p className="text-sm text-[#D85A30] mb-4">
                      Média: {average.toFixed(2)} ({label})
                    </p>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={distribution}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="value" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#D85A30" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Responses Table */}
        <div className="bg-white rounded-lg border border-[#1A1714]/10 overflow-hidden">
          <h3 className="text-2xl font-bold text-[#1A1714] p-6 border-b border-[#1A1714]/10">
            Todas as Respostas
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#1A1714]/5">
                <tr>
                  <th className="px-4 py-3 text-left">Data</th>
                  <th className="px-4 py-3 text-left">Nome</th>
                  <th className="px-4 py-3 text-left">Empresa</th>
                  <th className="px-4 py-3 text-left">Tempo</th>
                  {attributes.map((attr) => (
                    <th key={attr.key} className="px-4 py-3 text-center">
                      {attr.left}/{attr.right}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((response) => {
                  const tempoCategoria = getTempoCategoria(response.tempo_resposta_segundos)
                  return (
                    <tr
                      key={response.id}
                      className="border-t border-[#1A1714]/10 hover:bg-[#1A1714]/5"
                    >
                      <td className="px-4 py-3">
                        {new Date(response.created_at).toLocaleDateString("pt-PT")}
                      </td>
                      <td className="px-4 py-3">{response.name || "—"}</td>
                      <td className="px-4 py-3">{response.company || "—"}</td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium">{formatTempo(response.tempo_resposta_segundos)}</p>
                          <p className={`text-xs ${tempoCategoria.color}`}>{tempoCategoria.label}</p>
                        </div>
                      </td>
                      {attributes.map((attr) => (
                        <td key={attr.key} className="px-4 py-3 text-center">
                          {response[attr.key as keyof Response]}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleDelete(response.id)}
                          className="text-red-600 hover:text-red-800 text-xs"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
