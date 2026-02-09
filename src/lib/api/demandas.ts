import { supabase } from '@/lib/supabase';
import type {
    Demanda,
    DemandaInsert,
    DemandaUpdate,
    DemandaStatus,
    DemandaTipo
} from '@/types/database.types';

// ========================================
// Demandas API
// ========================================

export async function getDemandas(filters?: {
    status?: DemandaStatus;
    tipo?: DemandaTipo;
    bairro?: string;
    search?: string;
}) {
    let query = supabase
        .from('demandas')
        .select('*')
        .order('created_at', { ascending: false });

    if (filters?.status) {
        query = query.eq('status', filters.status);
    }
    if (filters?.tipo) {
        query = query.eq('tipo', filters.tipo);
    }
    if (filters?.bairro) {
        query = query.eq('bairro', filters.bairro);
    }
    if (filters?.search) {
        query = query.or(`titulo.ilike.%${filters.search}%,cidadao_nome.ilike.%${filters.search}%,protocolo.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Demanda[];
}

export async function getDemandaById(id: string) {
    const { data, error } = await supabase
        .from('demandas')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data as Demanda;
}

export async function createDemanda(demanda: DemandaInsert) {
    const { data, error } = await supabase
        .from('demandas')
        .insert(demanda as any)
        .select()
        .single();

    if (error) throw error;
    return data as Demanda;
}

export async function updateDemanda(id: string, updates: DemandaUpdate) {
    const { data, error } = await supabase
        .from('demandas')
        // @ts-ignore
        .update(updates as any)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data as Demanda;
}

export async function deleteDemanda(id: string) {
    const { error } = await supabase
        .from('demandas')
        .delete()
        .eq('id', id);

    if (error) throw error;
}

// ========================================
// Demandas Stats
// ========================================

export async function getDemandasStats() {
    const { data, error } = await supabase
        .from('demandas')
        .select('status, tipo, bairro');

    if (error) throw error;

    const demandas = data as any[];

    const stats = {
        total: demandas.length,
        porStatus: {} as Record<string, number>,
        porTipo: {} as Record<string, number>,
        porBairro: {} as Record<string, number>,
    };

    demandas.forEach((d) => {
        stats.porStatus[d.status] = (stats.porStatus[d.status] || 0) + 1;
        stats.porTipo[d.tipo] = (stats.porTipo[d.tipo] || 0) + 1;
        stats.porBairro[d.bairro] = (stats.porBairro[d.bairro] || 0) + 1;
    });

    return stats;
}
