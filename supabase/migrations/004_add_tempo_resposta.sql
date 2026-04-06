-- Add tempo_resposta_segundos column to sincre_responses table
ALTER TABLE sincre_responses
ADD COLUMN tempo_resposta_segundos INTEGER;

-- Add comment to explain the column
COMMENT ON COLUMN sincre_responses.tempo_resposta_segundos IS 'Tempo total em segundos que o participante levou para preencher o formulário';
