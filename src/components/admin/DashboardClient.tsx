"use client";

import { motion } from "framer-motion";
import {
    Heart,
    ClipboardList,
    Users,
    CheckCircle,
    Clock,
    TrendingUp,
    MapPin,
    ArrowUpRight,
    Plus,
} from "lucide-react";
import Link from "next/link";
import { Demanda } from "@/types/database.types";

interface DashboardStats {
    total: number;
    porStatus: Record<string, number>;
    porTipo: Record<string, number>;
    porBairro: Record<string, number>;
}

interface DashboardClientProps {
    stats: DashboardStats;
    recentDemandas: Demanda[];
    contatosCount: number;
}

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

export default function DashboardClient({ stats, recentDemandas, contatosCount }: DashboardClientProps) {
    const cards = [
        {
            label: "Total de Demandas",
            value: stats.total,
            icon: ClipboardList,
            color: "rosa",
        },
        {
            label: "Resolvidas",
            value: stats.porStatus['resolvida'] || 0,
            icon: CheckCircle,
            color: "green",
        },
        {
            label: "Em Análise",
            value: (stats.porStatus['em_analise'] || 0) + (stats.porStatus['encaminhada_prefeitura'] || 0),
            icon: Clock,
            color: "yellow",
        },
        {
            label: "Contatos",
            value: contatosCount,
            icon: Users,
            color: "blue",
        },
    ];

    // Ordenar bairros por número de demandas
    const bairrosHeatmap = Object.entries(stats.porBairro)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([nome, quantidade]) => ({
            nome,
            quantidade,
            percentual: (quantidade / stats.total) * 100
        }));

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500">Bem-vinda de volta, Dra. Lalá!</p>
                </div>
                <Link href="/admin/demandas/nova" className="btn-primary">
                    <Plus className="w-4 h-4" />
                    Nova Demanda
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                    >
                        <div className="flex items-start justify-between">
                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color === "rosa"
                                        ? "bg-rosa-100"
                                        : card.color === "green"
                                            ? "bg-green-100"
                                            : card.color === "yellow"
                                                ? "bg-yellow-100"
                                                : "bg-blue-100"
                                    }`}
                            >
                                <card.icon
                                    className={`w-6 h-6 ${card.color === "rosa"
                                            ? "text-rosa-600"
                                            : card.color === "green"
                                                ? "text-green-600"
                                                : card.color === "yellow"
                                                    ? "text-yellow-600"
                                                    : "text-blue-600"
                                        }`}
                                />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mt-4">{card.value}</p>
                        <p className="text-sm text-gray-500">{card.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Demands */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm"
                >
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900">Demandas Recentes</h2>
                            <Link
                                href="/admin/demandas"
                                className="text-rosa-600 text-sm font-medium hover:underline flex items-center gap-1"
                            >
                                Ver todas
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {recentDemandas.length > 0 ? (
                            recentDemandas.map((demanda) => (
                                <div key={demanda.id} className="p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">{demanda.titulo}</h3>
                                            <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {demanda.bairro}
                                                </span>
                                                <span>
                                                    {new Date(demanda.created_at).toLocaleDateString('pt-BR')}
                                                </span>
                                            </div>
                                        </div>
                                        <StatusBadge status={demanda.status} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center text-gray-500">
                                Nenhuma demanda recente encontrada.
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Heatmap by Neighborhood */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm"
                >
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900">Demandas por Bairro</h2>
                        <p className="text-sm text-gray-500">Visualização de densidade</p>
                    </div>
                    <div className="p-6 space-y-4">
                        {bairrosHeatmap.length > 0 ? (
                            bairrosHeatmap.map((bairro, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-rosa-500" />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-900">{bairro.nome}</span>
                                            <span className="text-sm text-gray-500">{bairro.quantidade}</span>
                                        </div>
                                        <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-rosa-500 rounded-full"
                                                style={{ width: `${bairro.percentual}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 py-4">
                                Sem dados suficientes.
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-rosa-600 to-rosa-500 rounded-2xl p-6 text-white"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Heart className="w-10 h-10 fill-white/30 mb-2" />
                        <h2 className="text-xl font-bold">Ações Rápidas</h2>
                        <p className="text-rosa-100">Gerencie o gabinete de forma eficiente</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/admin/demandas/nova"
                            className="px-4 py-2 bg-white text-rosa-600 rounded-xl font-medium hover:bg-rosa-50 transition-colors"
                        >
                            Nova Demanda
                        </Link>
                        <Link
                            href="/admin/contatos/novo"
                            className="px-4 py-2 bg-white/20 text-white rounded-xl font-medium hover:bg-white/30 transition-colors"
                        >
                            Novo Contato
                        </Link>
                        <Link
                            href="/admin/noticias/nova"
                            className="px-4 py-2 bg-white/20 text-white rounded-xl font-medium hover:bg-white/30 transition-colors"
                        >
                            Nova Notícia
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
