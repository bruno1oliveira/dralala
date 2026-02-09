import { supabase } from '@/lib/supabase';
import type { MensagemContato, MensagemContatoInsert } from '@/types/database.types';

// ========================================
// Mensagens de Contato API
// ========================================

export async function getMensagens(filters?: {
    lida?: boolean;
    respondida?: boolean;
}) {
    let query = supabase
        .from('mensagens_contato')
        .select('*')
        .order('created_at', { ascending: false });

    if (filters?.lida !== undefined) {
        query = query.eq('lida', filters.lida);
    }
    if (filters?.respondida !== undefined) {
        query = query.eq('respondida', filters.respondida);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as MensagemContato[];
}

export async function getMensagemById(id: string) {
    const { data, error } = await supabase
        .from('mensagens_contato')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data as MensagemContato;
}

// Para o formulário de contato público
export async function enviarMensagem(mensagem: MensagemContatoInsert) {
    const { data, error } = await supabase
        .from('mensagens_contato')
        .insert(mensagem)
        .select()
        .single();

    if (error) throw error;
    return data as MensagemContato;
}

export async function marcarComoLida(id: string) {
    const { data, error } = await supabase
        .from('mensagens_contato')
        .update({ lida: true })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data as MensagemContato;
}

export async function marcarComoRespondida(id: string) {
    const { data, error } = await supabase
        .from('mensagens_contato')
        .update({ respondida: true, lida: true })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data as MensagemContato;
}

export async function deleteMensagem(id: string) {
    const { error } = await supabase
        .from('mensagens_contato')
        .delete()
        .eq('id', id);

    if (error) throw error;
}
