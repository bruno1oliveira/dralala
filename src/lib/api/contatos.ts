import { supabase } from '@/lib/supabase';
import type {
    Contato,
    ContatoInsert,
    ContatoUpdate
} from '@/types/database.types';

// ========================================
// Contatos API
// ========================================

export async function getContatos(filters?: {
    bairro?: string;
    isApoiador?: boolean;
    search?: string;
    tags?: string[];
}) {
    let query = supabase
        .from('contatos')
        .select('*')
        .order('created_at', { ascending: false });

    if (filters?.bairro) {
        query = query.eq('bairro', filters.bairro);
    }
    if (filters?.isApoiador !== undefined) {
        query = query.eq('is_apoiador', filters.isApoiador);
    }
    if (filters?.search) {
        query = query.or(`nome.ilike.%${filters.search}%,telefone.ilike.%${filters.search}%,bairro.ilike.%${filters.search}%`);
    }
    if (filters?.tags && filters.tags.length > 0) {
        query = query.overlaps('tags', filters.tags);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Contato[];
}

export async function getContatoById(id: string) {
    const { data, error } = await supabase
        .from('contatos')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data as Contato;
}

export async function createContato(contato: ContatoInsert) {
    const { data, error } = await supabase
        .from('contatos')
        .insert(contato as any)
        .select()
        .single();

    if (error) throw error;
    return data as Contato;
}

export async function updateContato(id: string, updates: ContatoUpdate) {
    const { data, error } = await supabase
        .from('contatos')
        // @ts-ignore
        .update(updates as any)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data as Contato;
}

export async function deleteContato(id: string) {
    const { error } = await supabase
        .from('contatos')
        .delete()
        .eq('id', id);

    if (error) throw error;
}

// ========================================
// Contatos Stats
// ========================================

export async function getContatosStats() {
    const { data, error } = await supabase
        .from('contatos')
        .select('is_apoiador, bairro, tags');

    if (error) throw error;

    const contatos = data as any[];

    const stats = {
        total: contatos.length,
        apoiadores: contatos.filter((c: any) => c.is_apoiador).length,
        porBairro: {} as Record<string, number>,
        tagsCounts: {} as Record<string, number>,
    };

    contatos.forEach((c: any) => {
        stats.porBairro[c.bairro] = (stats.porBairro[c.bairro] || 0) + 1;
        c.tags?.forEach((tag: string) => {
            stats.tagsCounts[tag] = (stats.tagsCounts[tag] || 0) + 1;
        });
    });

    return stats;
}
