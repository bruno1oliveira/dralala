export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type DemandaStatus =
    | 'nova'
    | 'em_analise'
    | 'encaminhada_prefeitura'
    | 'resolvida'
    | 'arquivada';

export type DemandaTipo =
    | 'iluminacao'
    | 'buraco'
    | 'assistencia'
    | 'saude'
    | 'educacao'
    | 'transporte'
    | 'moradia'
    | 'outros';

export type NoticiaStatus =
    | 'rascunho'
    | 'pendente_aprovacao'
    | 'publicada'
    | 'arquivada';

export interface Database {
    public: {
        Tables: {
            demandas: {
                Row: {
                    id: string;
                    created_at: string;
                    updated_at: string;
                    protocolo: string;
                    titulo: string;
                    descricao: string;
                    tipo: DemandaTipo;
                    status: DemandaStatus;
                    cidadao_nome: string;
                    cidadao_telefone: string;
                    cidadao_email: string | null;
                    bairro: string;
                    endereco: string | null;
                    latitude: number | null;
                    longitude: number | null;
                    observacoes: string | null;
                    resposta: string | null;
                    resolvida_em: string | null;
                };
                Insert: {
                    id?: string;
                    created_at?: string;
                    updated_at?: string;
                    protocolo?: string;
                    titulo: string;
                    descricao: string;
                    tipo: DemandaTipo;
                    status?: DemandaStatus;
                    cidadao_nome: string;
                    cidadao_telefone: string;
                    cidadao_email?: string | null;
                    bairro: string;
                    endereco?: string | null;
                    latitude?: number | null;
                    longitude?: number | null;
                    observacoes?: string | null;
                    resposta?: string | null;
                    resolvida_em?: string | null;
                };
                Update: {
                    id?: string;
                    created_at?: string;
                    updated_at?: string;
                    protocolo?: string;
                    titulo?: string;
                    descricao?: string;
                    tipo?: DemandaTipo;
                    status?: DemandaStatus;
                    cidadao_nome?: string;
                    cidadao_telefone?: string;
                    cidadao_email?: string | null;
                    bairro?: string;
                    endereco?: string | null;
                    latitude?: number | null;
                    longitude?: number | null;
                    observacoes?: string | null;
                    resposta?: string | null;
                    resolvida_em?: string | null;
                };
            };
            contatos: {
                Row: {
                    id: string;
                    created_at: string;
                    updated_at: string;
                    nome: string;
                    telefone: string;
                    email: string | null;
                    bairro: string;
                    tags: string[];
                    is_apoiador: boolean;
                    notas: string | null;
                };
                Insert: {
                    id?: string;
                    created_at?: string;
                    updated_at?: string;
                    nome: string;
                    telefone: string;
                    email?: string | null;
                    bairro: string;
                    tags?: string[];
                    is_apoiador?: boolean;
                    notas?: string | null;
                };
                Update: {
                    id?: string;
                    created_at?: string;
                    updated_at?: string;
                    nome?: string;
                    telefone?: string;
                    email?: string | null;
                    bairro?: string;
                    tags?: string[];
                    is_apoiador?: boolean;
                    notas?: string | null;
                };
            };
            noticias: {
                Row: {
                    id: string;
                    created_at: string;
                    updated_at: string;
                    titulo: string;
                    slug: string;
                    resumo: string;
                    conteudo: string;
                    imagem_url: string | null;
                    categoria: string;
                    status: NoticiaStatus;
                    autor: string;
                    publicada_em: string | null;
                    visualizacoes: number;
                };
                Insert: {
                    id?: string;
                    created_at?: string;
                    updated_at?: string;
                    titulo: string;
                    slug: string;
                    resumo: string;
                    conteudo: string;
                    imagem_url?: string | null;
                    categoria: string;
                    status?: NoticiaStatus;
                    autor?: string;
                    publicada_em?: string | null;
                    visualizacoes?: number;
                };
                Update: {
                    id?: string;
                    created_at?: string;
                    updated_at?: string;
                    titulo?: string;
                    slug?: string;
                    resumo?: string;
                    conteudo?: string;
                    imagem_url?: string | null;
                    categoria?: string;
                    status?: NoticiaStatus;
                    autor?: string;
                    publicada_em?: string | null;
                    visualizacoes?: number;
                };
            };
            mensagens_contato: {
                Row: {
                    id: string;
                    created_at: string;
                    nome: string;
                    email: string;
                    telefone: string | null;
                    assunto: string;
                    mensagem: string;
                    lida: boolean;
                    respondida: boolean;
                };
                Insert: {
                    id?: string;
                    created_at?: string;
                    nome: string;
                    email: string;
                    telefone?: string | null;
                    assunto: string;
                    mensagem: string;
                    lida?: boolean;
                    respondida?: boolean;
                };
                Update: {
                    id?: string;
                    created_at?: string;
                    nome?: string;
                    email?: string;
                    telefone?: string | null;
                    assunto?: string;
                    mensagem?: string;
                    lida?: boolean;
                    respondida?: boolean;
                };
            };
            configuracoes: {
                Row: {
                    id: string;
                    created_at: string;
                    updated_at: string;
                    chave: string;
                    valor: Json;
                };
                Insert: {
                    id?: string;
                    created_at?: string;
                    updated_at?: string;
                    chave: string;
                    valor: Json;
                };
                Update: {
                    id?: string;
                    created_at?: string;
                    updated_at?: string;
                    chave?: string;
                    valor?: Json;
                };
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            demanda_status: DemandaStatus;
            demanda_tipo: DemandaTipo;
            noticia_status: NoticiaStatus;
        };
    };
}

// Helper types
export type Demanda = Database['public']['Tables']['demandas']['Row'];
export type DemandaInsert = Database['public']['Tables']['demandas']['Insert'];
export type DemandaUpdate = Database['public']['Tables']['demandas']['Update'];

export type Contato = Database['public']['Tables']['contatos']['Row'];
export type ContatoInsert = Database['public']['Tables']['contatos']['Insert'];
export type ContatoUpdate = Database['public']['Tables']['contatos']['Update'];

export type Noticia = Database['public']['Tables']['noticias']['Row'];
export type NoticiaInsert = Database['public']['Tables']['noticias']['Insert'];
export type NoticiaUpdate = Database['public']['Tables']['noticias']['Update'];

export type MensagemContato = Database['public']['Tables']['mensagens_contato']['Row'];
export type MensagemContatoInsert = Database['public']['Tables']['mensagens_contato']['Insert'];

export type Configuracao = Database['public']['Tables']['configuracoes']['Row'];
