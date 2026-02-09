"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Plus,
    Calendar,
    Eye,
    Edit,
    Trash2,
    Heart,
    Image as ImageIcon,
    Clock,
    User,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Noticia } from "@/types/database.types";

interface NoticiasClientProps {
    noticias: Noticia[];
}

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        publicada: "bg-green-100 text-green-700",
        pendente_aprovacao: "bg-yellow-100 text-yellow-700",
        rascunho: "bg-gray-100 text-gray-600",
        arquivada: "bg-red-100 text-red-600",
    };

    const labels: Record<string, string> = {
        publicada: "Publicada",
        pendente_aprovacao: "Pendente",
        rascunho: "Rascunho",
        arquivada: "Arquivada",
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
            {labels[status]}
        </span>
    );
};

export default function NoticiasClient({ noticias }: NoticiasClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialSearch = searchParams.get("search") || "";
    const initialStatus = searchParams.get("status") || "all";

    const [searchTerm, setSearchTerm] = useState(initialSearch);

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

    // Calcular estatísticas locais baseadas nas notícias recebidas (ou totais se tivéssemos essa info separada)
    // Nota: Em uma app real com paginação, essas stats deveriam vir do backend.
    // Por enquanto, assumindo que trazemos todas ou as mais recentes, podemos mostrar o count do array atual.

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Notícias</h1>
                    <p className="text-gray-500">Gerencie as notícias do site</p>
                </div>
                <Link href="/admin/noticias/nova" className="btn-primary">
                    <Plus className="w-4 h-4" />
                    Nova Notícia
                </Link>
            </div>

            {/* Stats - Simplificado para mostrar contagem atual */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <p className="text-2xl font-bold text-gray-900">{noticias.length}</p>
                    <p className="text-sm text-gray-500">Exibindo</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <p className="text-2xl font-bold text-green-600">
                        {noticias.filter((n) => n.status === "publicada").length}
                    </p>
                    <p className="text-sm text-gray-500">Publicadas</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <p className="text-2xl font-bold text-yellow-600">
                        {noticias.filter((n) => n.status === "pendente_aprovacao").length}
                    </p>
                    <p className="text-sm text-gray-500">Pendentes</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <p className="text-2xl font-bold text-gray-600">
                        {noticias.filter((n) => n.status === "rascunho").length}
                    </p>
                    <p className="text-sm text-gray-500">Rascunhos</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar notícia..."
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
                        <option value="all">Todos os Status</option>
                        <option value="publicada">Publicadas</option>
                        <option value="pendente_aprovacao">Pendentes</option>
                        <option value="rascunho">Rascunhos</option>
                        <option value="arquivada">Arquivadas</option>
                    </select>
                </div>
            </div>

            {/* News List */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Notícia
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Autor
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Data
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Views
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            <AnimatePresence>
                                {noticias.map((noticia) => (
                                    <motion.tr
                                        key={noticia.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-12 rounded-lg bg-rosa-100 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                                                    {noticia.imagem_url ? (
                                                        <img src={noticia.imagem_url} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <ImageIcon className="w-5 h-5 text-rosa-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 line-clamp-1">
                                                        {noticia.titulo}
                                                    </p>
                                                    <p className="text-xs text-gray-500 line-clamp-1">
                                                        {noticia.resumo}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={noticia.status} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center gap-1 text-sm text-gray-600">
                                                <User className="w-3 h-3" />
                                                Assessoria
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center gap-1 text-sm text-gray-500">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(noticia.created_at).toLocaleDateString('pt-BR')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center gap-1 text-sm text-gray-500">
                                                <Eye className="w-3 h-3" />
                                                {noticia.visualizacoes || 0}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <Eye className="w-4 h-4 text-gray-500" />
                                                </button>
                                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <Edit className="w-4 h-4 text-gray-500" />
                                                </button>
                                                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
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

                {noticias.length === 0 && (
                    <div className="p-12 text-center">
                        <Heart className="w-16 h-16 text-rosa-200 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Nenhuma notícia encontrada
                        </h3>
                        <p className="text-gray-500">
                            Tente ajustar os filtros ou criar uma nova notícia.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
