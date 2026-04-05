-- Create sincre_responses table for brand personality research
CREATE TABLE sincre_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT,
  company TEXT,
  proximo_distante INTEGER CHECK (proximo_distante BETWEEN 1 AND 5),
  conservador_inovador INTEGER CHECK (conservador_inovador BETWEEN 1 AND 5),
  serio_descontraido INTEGER CHECK (serio_descontraido BETWEEN 1 AND 5),
  humano_tecnico INTEGER CHECK (humano_tecnico BETWEEN 1 AND 5),
  complexo_simples INTEGER CHECK (complexo_simples BETWEEN 1 AND 5),
  feminino_masculino INTEGER CHECK (feminino_masculino BETWEEN 1 AND 5),
  leve_pesado INTEGER CHECK (leve_pesado BETWEEN 1 AND 5),
  agressivo_amigavel INTEGER CHECK (agressivo_amigavel BETWEEN 1 AND 5),
  popular_elitizado INTEGER CHECK (popular_elitizado BETWEEN 1 AND 5),
  moderno_tradicional INTEGER CHECK (moderno_tradicional BETWEEN 1 AND 5),
  animado_tranquilo INTEGER CHECK (animado_tranquilo BETWEEN 1 AND 5),
  comum_diferente INTEGER CHECK (comum_diferente BETWEEN 1 AND 5)
);
-- Create index for ordering by date
CREATE INDEX idx_sincre_responses_created_at ON sincre_responses(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE sincre_responses ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (public form submission)
CREATE POLICY "Anyone can insert responses" ON sincre_responses
  FOR INSERT
  WITH CHECK (true);

-- Policy: Anyone can read (public results page - will add password protection in app)
CREATE POLICY "Anyone can read responses" ON sincre_responses
  FOR SELECT
  USING (true);

-- Policy: Anyone can delete (for admin cleanup from results page)
CREATE POLICY "Anyone can delete responses" ON sincre_responses
  FOR DELETE
  USING (true);