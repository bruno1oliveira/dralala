"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    UserPlus,
    Phone,
    Mail,
    MapPin,
    Star,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    Heart,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Contato } from "@/types/database.types";

interface ContatosClientProps {
    contatos: Contato[];
}

const tagColors: Record<string, string> = {
    "Apoiador": "bg-green-100 text-green-700",
    "Líder Comunitário": "bg-purple-100 text-purple-700",
    "Comerciante": "bg-blue-100 text-blue-700",
    "Saúde": "bg-red-100 text-red-700",
    "Voluntário": "bg-yellow-100 text-yellow-700",
    "Educação": "bg-indigo-100 text-indigo-700",
    "Igreja": "bg-orange-100 text-orange-700",
    "Assistência Social": "bg-pink-100 text-pink-700",
};

export default function ContatosClient({ contatos }: ContatosClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialSearch = searchParams.get("search") || "";
    // Nota: Como 'apoiadores' é um booleano no filtro, precisamos tratar a string "true"
    const initialApoiadores = searchParams.get("apoiador") === "true";

    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [filterApoiadores, setFilterApoiadores] = useState(initialApoiadores);

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("search", term);
        } else {
            params.delete("search");
        }
        router.replace(`?${params.toString()}`);
    }, 300);

    const handleApoiadorChange = (checked: boolean) => {
        setFilterApoiadores(checked);
        const params = new URLSearchParams(searchParams);
        if (checked) {
            params.set("apoiador", "true");
        } else {
            params.delete("apoiador");
        }
        router.replace(`?${params.toString()}`);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Contatos</h1>
                    <p className="text-gray-500">Gerencie sua base de contatos</p>
                </div>
                <button className="btn-primary">
                    <UserPlus className="w-4 h-4" />
                    Novo Contato
                </button>
            </div>

            {/* Stats - Simplificado para mostrar dados carregados */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <p className="text-2xl font-bold text-gray-900">{contatos.length}</p>
                    <p className="text-sm text-gray-500">Exibindo</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <p className="text-2xl font-bold text-green-600">
                        {contatos.filter((c) => c.is_apoiador).length}
                    </p>
                    <p className="text-sm text-gray-500">Apoiadores (nesta lista)</p>
                </div>
                {/* Outras stats seriam globais e melhor buscadas separadamente se necessário */}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nome, telefone ou bairro..."
                            defaultValue={initialSearch}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                handleSearch(e.target.value);
                            }}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rosa-500 focus:border-transparent"
                        />
                    </div>

                    {/* Apoiadores Filter */}
                    <label className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                        <input
                            type="checkbox"
                            checked={filterApoiadores}
                            onChange={(e) => handleApoiadorChange(e.target.checked)}
                            className="w-4 h-4 text-rosa-600 rounded focus:ring-rosa-500"
                        />
                        <span className="text-sm text-gray-700">Apenas apoiadores</span>
                    </label>
                </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-gray-500">
                Exibindo {contatos.length} contatos
            </p>

            {/* Contacts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                    {contatos.map((contato) => (
                        <motion.div
                            key={contato.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-rosa-100 flex items-center justify-center">
                                        <span className="text-rosa-600 font-bold text-lg">
                                            {contato.nome.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                            {contato.nome}
                                            {contato.is_apoiador && (
                                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            )}
                                        </h3>
                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {contato.bairro || "Sem bairro"}
                                        </p>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-gray-100 rounded-lg">
                                    <MoreVertical className="w-4 h-4 text-gray-400" />
                                </button>
                            </div>

                            <div className="space-y-2 mb-4">
                                <a
                                    href={`tel:${contato.telefone}`}
                                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-rosa-600"
                                >
                                    <Phone className="w-4 h-4" />
                                    {contato.telefone}
                                </a>
                                {contato.email && (
                                    <a
                                        href={`mailto:${contato.email}`}
                                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-rosa-600"
                                    >
                                        <Mail className="w-4 h-4" />
                                        {contato.email}
                                    </a>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {contato.tags?.map((tag, index) => (
                                    <span
                                        key={index}
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${tagColors[tag] || "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {contato.notas && (
                                <p className="text-sm text-gray-500 italic border-t border-gray-100 pt-3">
                                    {contato.notas}
                                </p>
                            )}

                            <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
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
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {contatos.length === 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                    <Heart className="w-16 h-16 text-rosa-200 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Nenhum contato encontrado
                    </h3>
                    <p className="text-gray-500">
                        Tente ajustar os filtros ou adicionar um novo contato.
                    </p>
                </div>
            )}
        </div>
    );
}
