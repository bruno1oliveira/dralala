"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Filter,
    Plus,
    MapPin,
    Clock,
    ChevronDown,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    Heart,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Demanda, DemandaStatus, DemandaTipo } from "@/types/database.types";
import { useDebouncedCallback } from "use-debounce";

interface DemandasClientProps {
    demandas: Demanda[];
}

const statusOptions = [
    { value: "all", label: "Todos os Status" },
    { value: "nova", label: "Nova" },
    { value: "em_analise", label: "Em Análise" },
    { value: "encaminhada_prefeitura", label: "Encaminhada" },
    { value: "resolvida", label: "Resolvida" },
    { value: "arquivada", label: "Arquivada" },
];

const tipoOptions = [
    { value: "all", label: "Todos os Tipos" },
    { value: "iluminacao", label: "💡 Iluminação" },
    { value: "buraco", label: "🕳️ Buraco/Via" },
    { value: "assistencia", label: "❤️ Assistência Social" },
    { value: "saude", label: "🏥 Saúde" },
    { value: "educacao", label: "📚 Educação" },
    { value: "transporte", label: "🚌 Transporte" },
    { value: "moradia", label: "🏠 Moradia" },
    { value: "outros", label: "📋 Outros" },
];

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        nova: "bg-blue-100 text-blue-700",
        em_analise: "bg-yellow-100 text-yellow-700",
        encaminhada_prefeitura: "bg-purple-100 text-purple-700",
        resolvida: "bg-green-100 text-green-700",
        arquivada: "bg-gray-100 text-gray-600",
    };

    const labels: Record<string, string> = {
        nova: "Nova",
        em_analise: "Em Análise",
        encaminhada_prefeitura: "Encaminhada",
        resolvida: "Resolvida",
        arquivada: "Arquivada",
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
            {labels[status]}
        </span>
    );
};

const TipoBadge = ({ tipo }: { tipo: string }) => {
    const emojis: Record<string, string> = {
        iluminacao: "💡",
        buraco: "🕳️",
        assistencia: "❤️",
        saude: "🏥",
        educacao: "📚",
        transporte: "🚌",
        moradia: "🏠",
        outros: "📋",
    };

    return <span className="text-lg">{emojis[tipo] || "📋"}</span>;
};

export default function DemandasClient({ demandas }: DemandasClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Estado local inicial baseado na URL, mas updates via URL
    const initialSearch = searchParams.get("search") || "";
    const initialStatus = searchParams.get("status") || "all";
    const initialTipo = searchParams.get("tipo") || "all";

    const [searchTerm, setSearchTerm] = useState(initialSearch);

    // Debounce search update
    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("search", term);
        } else {
            params.delete("search");
        }
        router.replace(`?${params.toString()}`);
    }, 300);

    const handleFilterChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value && value !== "all") {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.replace(`?${params.toString()}`);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Demandas</h1>
                    <p className="text-gray-500">Gerencie as demandas do gabinete</p>
                </div>
                <Link href="/admin/demandas/nova" className="btn-primary">
                    <Plus className="w-4 h-4" />
                    Nova Demanda
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por título, cidadão ou protocolo..."
                            defaultValue={initialSearch}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                handleSearch(e.target.value);
                            }}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-500 focus:border-transparent"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        defaultValue={initialStatus}
                        onChange={(e) => handleFilterChange("status", e.target.value)}
                        className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-500 bg-white"
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    {/* Tipo Filter */}
                    <select
                        defaultValue={initialTipo}
                        onChange={(e) => handleFilterChange("tipo", e.target.value)}
                        className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-500 bg-white"
                    >
                        {tipoOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-gray-500">
                Exibindo {demandas.length} demandas
            </p>

            {/* Demands List */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Demanda
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Cidadão
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Bairro
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Data
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            <AnimatePresence>
                                {demandas.map((demanda) => (
                                    <motion.tr
                                        key={demanda.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <TipoBadge tipo={demanda.tipo} />
                                                <div>
                                                    <p className="font-medium text-gray-900">{demanda.titulo}</p>
                                                    <p className="text-xs text-gray-500">{demanda.protocolo || "Sem protocolo"}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-900">{demanda.cidadao_nome}</p>
                                            <p className="text-xs text-gray-500">{demanda.cidadao_telefone}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center gap-1 text-sm text-gray-600">
                                                <MapPin className="w-3 h-3" />
                                                {demanda.bairro}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={demanda.status} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center gap-1 text-sm text-gray-500">
                                                <Clock className="w-3 h-3" />
                                                {new Date(demanda.created_at).toLocaleDateString('pt-BR')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Ver detalhes">
                                                    <Eye className="w-4 h-4 text-gray-500" />
                                                </button>
                                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Editar">
                                                    <Edit className="w-4 h-4 text-gray-500" />
                                                </button>
                                                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {demandas.length === 0 && (
                    <div className="p-12 text-center">
                        <Heart className="w-16 h-16 text-rosa-200 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Nenhuma demanda encontrada
                        </h3>
                        <p className="text-gray-500">
                            Tente ajustar os filtros ou criar uma nova demanda.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
