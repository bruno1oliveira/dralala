import { supabase } from '@/lib/supabase';
import type {
    Noticia,
    NoticiaInsert,
    NoticiaUpdate,
    NoticiaStatus
} from '@/types/database.types';

// ========================================
// Notícias API
// ========================================

export async function getNoticias(filters?: {
    status?: NoticiaStatus;
    categoria?: string;
    search?: string;
    limit?: number;
}) {
    let query = supabase
        .from('noticias')
        .select('*')
        .order('created_at', { ascending: false });

    if (filters?.status) {
        query = query.eq('status', filters.status);
    }
    if (filters?.categoria) {
        query = query.eq('categoria', filters.categoria);
    }
    if (filters?.search) {
        query = query.or(`titulo.ilike.%${filters.search}%,resumo.ilike.%${filters.search}%`);
    }
    if (filters?.limit) {
        query = query.limit(filters.limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Noticia[];
}

// Para o site público - apenas notícias publicadas
export async function getNoticiasPublicadas(limit?: number) {
    return getNoticias({ status: 'publicada', limit });
}

export async function getNoticiaBySlug(slug: string) {
    const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) throw error;

    // Incrementar visualizações
    const noticia = data as any;
    await supabase
        .from('noticias')
        // @ts-ignore
        .update({ visualizacoes: (noticia.visualizacoes || 0) + 1 } as any)
        .eq('id', noticia.id);

    return data as Noticia;
}

export async function getNoticiaById(id: string) {
    const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data as Noticia;
}

export async function createNoticia(noticia: NoticiaInsert) {
    const { data, error } = await supabase
        .from('noticias')
        .insert(noticia as any)
        .select()
        .single();

    if (error) throw error;
    return data as Noticia;
}

export async function updateNoticia(id: string, updates: NoticiaUpdate) {
    // Se estiver publicando, definir data de publicação
    if (updates.status === 'publicada' && !updates.publicada_em) {
        updates.publicada_em = new Date().toISOString();
    }

    const { data, error } = await supabase
        .from('noticias')
        // @ts-ignore
        .update(updates as any)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data as Noticia;
}

export async function deleteNoticia(id: string) {
    const { error } = await supabase
        .from('noticias')
        .delete()
        .eq('id', id);

    if (error) throw error;
}

// Gerar slug a partir do título
export function generateSlug(titulo: string): string {
    return titulo
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/[^a-z0-9]+/g, '-')     // Substitui caracteres especiais por hífen
        .replace(/^-+|-+$/g, '');          // Remove hífens do início e fim
}
