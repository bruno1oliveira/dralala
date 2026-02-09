-- =========================================
-- Schema Gabinete Vereadora Dra. Lalá
-- =========================================

-- Tipos ENUM
CREATE TYPE demanda_status AS ENUM (
  'nova',
  'em_analise',
  'encaminhada_prefeitura',
  'resolvida',
  'arquivada'
);

CREATE TYPE demanda_tipo AS ENUM (
  'iluminacao',
  'buraco',
  'assistencia',
  'saude',
  'educacao',
  'transporte',
  'moradia',
  'outros'
);

CREATE TYPE noticia_status AS ENUM (
  'rascunho',
  'pendente_aprovacao',
  'publicada',
  'arquivada'
);

-- =========================================
-- Tabela: demandas
-- =========================================
CREATE TABLE demandas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- Identificação
  protocolo TEXT UNIQUE NOT NULL DEFAULT 'DEM-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('demandas_protocolo_seq')::TEXT, 4, '0'),
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  
  -- Classificação
  tipo demanda_tipo NOT NULL DEFAULT 'outros',
  status demanda_status NOT NULL DEFAULT 'nova',
  
  -- Cidadão
  cidadao_nome TEXT NOT NULL,
  cidadao_telefone TEXT NOT NULL,
  cidadao_email TEXT,
  
  -- Localização
  bairro TEXT NOT NULL,
  endereco TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Gestão
  observacoes TEXT,
  resposta TEXT,
  resolvida_em TIMESTAMPTZ
);

-- Sequência para protocolo
CREATE SEQUENCE IF NOT EXISTS demandas_protocolo_seq START 1;

-- Function para gerar protocolo
CREATE OR REPLACE FUNCTION generate_demanda_protocolo()
RETURNS TRIGGER AS $$
BEGIN
  NEW.protocolo := 'DEM-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('demandas_protocolo_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para gerar protocolo automaticamente
CREATE TRIGGER set_demanda_protocolo
  BEFORE INSERT ON demandas
  FOR EACH ROW
  WHEN (NEW.protocolo IS NULL OR NEW.protocolo = '')
  EXECUTE FUNCTION generate_demanda_protocolo();

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_demandas_updated_at
  BEFORE UPDATE ON demandas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Índices
CREATE INDEX idx_demandas_status ON demandas(status);
CREATE INDEX idx_demandas_tipo ON demandas(tipo);
CREATE INDEX idx_demandas_bairro ON demandas(bairro);
CREATE INDEX idx_demandas_created_at ON demandas(created_at DESC);

-- =========================================
-- Tabela: contatos
-- =========================================
CREATE TABLE contatos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT,
  bairro TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  is_apoiador BOOLEAN DEFAULT FALSE,
  notas TEXT
);

CREATE TRIGGER update_contatos_updated_at
  BEFORE UPDATE ON contatos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Índices
CREATE INDEX idx_contatos_is_apoiador ON contatos(is_apoiador);
CREATE INDEX idx_contatos_bairro ON contatos(bairro);
CREATE INDEX idx_contatos_tags ON contatos USING GIN(tags);

-- =========================================
-- Tabela: noticias
-- =========================================
CREATE TABLE noticias (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  titulo TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  resumo TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  imagem_url TEXT,
  categoria TEXT NOT NULL DEFAULT 'Geral',
  status noticia_status NOT NULL DEFAULT 'rascunho',
  autor TEXT DEFAULT 'Assessoria',
  publicada_em TIMESTAMPTZ,
  visualizacoes INTEGER DEFAULT 0
);

CREATE TRIGGER update_noticias_updated_at
  BEFORE UPDATE ON noticias
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Índices
CREATE INDEX idx_noticias_status ON noticias(status);
CREATE INDEX idx_noticias_categoria ON noticias(categoria);
CREATE INDEX idx_noticias_publicada_em ON noticias(publicada_em DESC);

-- =========================================
-- Tabela: mensagens_contato
-- =========================================
CREATE TABLE mensagens_contato (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT,
  assunto TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  lida BOOLEAN DEFAULT FALSE,
  respondida BOOLEAN DEFAULT FALSE
);

-- Índices
CREATE INDEX idx_mensagens_lida ON mensagens_contato(lida);
CREATE INDEX idx_mensagens_created_at ON mensagens_contato(created_at DESC);

-- =========================================
-- Tabela: configuracoes
-- =========================================
CREATE TABLE configuracoes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  chave TEXT UNIQUE NOT NULL,
  valor JSONB NOT NULL DEFAULT '{}'
);

CREATE TRIGGER update_configuracoes_updated_at
  BEFORE UPDATE ON configuracoes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Configurações iniciais
INSERT INTO configuracoes (chave, valor) VALUES
  ('site', '{
    "nome": "Gabinete Vereadora Dra. Lalá",
    "partido": "PSD",
    "cidade": "Caraguatatuba",
    "estado": "SP",
    "descricao": "Plataforma digital do Gabinete da Vereadora Dra. Lalá - PSD. Advogada comprometida com a justiça social."
  }'::jsonb),
  ('contato', '{
    "telefone": "(12) 3999-9999",
    "whatsapp": "(12) 99999-9999",
    "email": "gabinete@dralala.com.br",
    "endereco": "Rua Example, 123 - Centro"
  }'::jsonb),
  ('redes_sociais', '{
    "instagram": "https://instagram.com/lalavereadora",
    "facebook": "https://facebook.com/lalavereadora",
    "youtube": "https://youtube.com/@lalavereadora"
  }'::jsonb);

-- =========================================
-- Row Level Security (RLS)
-- =========================================

-- Habilitar RLS
ALTER TABLE demandas ENABLE ROW LEVEL SECURITY;
ALTER TABLE contatos ENABLE ROW LEVEL SECURITY;
ALTER TABLE noticias ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensagens_contato ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracoes ENABLE ROW LEVEL SECURITY;

-- Políticas para demandas (público pode inserir, autenticados podem ver/editar)
CREATE POLICY "Público pode criar demandas" ON demandas
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Autenticados podem ver demandas" ON demandas
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Autenticados podem atualizar demandas" ON demandas
  FOR UPDATE TO authenticated
  USING (true);

-- Políticas para contatos (apenas autenticados)
CREATE POLICY "Autenticados podem gerenciar contatos" ON contatos
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Políticas para notícias (público pode ver publicadas, autenticados gerenciam)
CREATE POLICY "Público pode ver notícias publicadas" ON noticias
  FOR SELECT TO anon
  USING (status = 'publicada');

CREATE POLICY "Autenticados podem gerenciar notícias" ON noticias
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Políticas para mensagens de contato (público pode inserir, autenticados veem)
CREATE POLICY "Público pode enviar mensagens" ON mensagens_contato
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Autenticados podem ver mensagens" ON mensagens_contato
  FOR ALL TO authenticated
  USING (true);

-- Políticas para configurações (apenas autenticados)
CREATE POLICY "Público pode ver configurações" ON configuracoes
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "Autenticados podem gerenciar configurações" ON configuracoes
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- =========================================
-- Views para Dashboard
-- =========================================

CREATE OR REPLACE VIEW dashboard_stats AS
SELECT
  (SELECT COUNT(*) FROM demandas) as total_demandas,
  (SELECT COUNT(*) FROM demandas WHERE status = 'nova') as demandas_novas,
  (SELECT COUNT(*) FROM demandas WHERE status = 'em_analise') as demandas_em_analise,
  (SELECT COUNT(*) FROM demandas WHERE status = 'resolvida') as demandas_resolvidas,
  (SELECT COUNT(*) FROM contatos) as total_contatos,
  (SELECT COUNT(*) FROM contatos WHERE is_apoiador = true) as total_apoiadores,
  (SELECT COUNT(*) FROM noticias WHERE status = 'publicada') as noticias_publicadas,
  (SELECT COUNT(*) FROM mensagens_contato WHERE lida = false) as mensagens_nao_lidas;

CREATE OR REPLACE VIEW demandas_por_bairro AS
SELECT 
  bairro,
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE status = 'resolvida') as resolvidas
FROM demandas
GROUP BY bairro
ORDER BY total DESC;

CREATE OR REPLACE VIEW demandas_por_tipo AS
SELECT 
  tipo,
  COUNT(*) as total
FROM demandas
GROUP BY tipo
ORDER BY total DESC;
