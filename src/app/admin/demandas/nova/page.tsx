"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Save,
    User,
    Phone,
    Mail,
    MapPin,
    FileText,
    Lightbulb,
    Construction,
    HeartHandshake,
    Stethoscope,
    GraduationCap,
    Bus,
    Home,
    ClipboardList,
    Loader2,
} from "lucide-react";
import Link from "next/link";
import { createDemanda } from "@/lib/api/demandas";
import { DemandaTipo } from "@/types/database.types";

const demandTypes = [
    { id: "iluminacao", icon: Lightbulb, label: "Iluminação", emoji: "💡" },
    { id: "buraco", icon: Construction, label: "Buraco/Via", emoji: "🕳️" },
    { id: "assistencia", icon: HeartHandshake, label: "Assistência Social", emoji: "❤️" },
    { id: "saude", icon: Stethoscope, label: "Saúde", emoji: "🏥" },
    { id: "educacao", icon: GraduationCap, label: "Educação", emoji: "📚" },
    { id: "transporte", icon: Bus, label: "Transporte", emoji: "🚌" },
    { id: "moradia", icon: Home, label: "Moradia", emoji: "🏠" },
    { id: "outros", icon: ClipboardList, label: "Outros", emoji: "📋" },
];

const bairros = [
    "Centro",
    "Martim de Sá",
    "Indaiá",
    "Massaguaçu",
    "Tabatinga",
    "Sumaré",
    "Jaraguazinho",
    "Porto Novo",
    "Caputera",
    "Travessão",
    "Outro",
];

export default function NovaDemandaPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        titulo: "",
        descricao: "",
        tipo: "outros" as DemandaTipo,
        cidadao_nome: "",
        cidadao_telefone: "",
        cidadao_email: "",
        bairro: "",
        endereco: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await createDemanda({
                ...formData,
                cidadao_email: formData.cidadao_email || null,
                endereco: formData.endereco || null,
                status: "nova", // Sempre começa como nova
            });

            router.push("/admin/demandas");
            router.refresh();
        } catch (err) {
            console.error("Erro ao criar demanda:", err);
            setError("Erro ao criar demanda. Verifique os dados e tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/demandas"
                    className="p-2 hover:bg-white rounded-lg transition-colors text-gray-500"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Nova Demanda</h1>
                    <p className="text-gray-500">Registre uma nova demanda manualmente</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dados da Demanda */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-rosa-500" />
                        Detalhes da Demanda
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Título *
                            </label>
                            <input
                                type="text"
                                name="titulo"
                                required
                                value={formData.titulo}
                                onChange={handleInputChange}
                                placeholder="Resumo da demanda"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-500"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Descrição Detalhada *
                            </label>
                            <textarea
                                name="descricao"
                                required
                                rows={4}
                                value={formData.descricao}
                                onChange={handleInputChange}
                                placeholder="Descreva os detalhes da solicitação..."
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-500 resize-none"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tipo de Demanda *
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {demandTypes.map((type) => (
                                    <button
                                        key={type.id}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, tipo: type.id as DemandaTipo }))}
                                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${formData.tipo === type.id
                                                ? "border-rosa-500 bg-rosa-50 text-rosa-700"
                                                : "border-gray-200 hover:border-rosa-200 hover:bg-gray-50 text-gray-600"
                                            }`}
                                    >
                                        <span className="text-2xl mb-2">{type.emoji}</span>
                                        <span className="text-xs font-medium text-center">{type.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dados do Cidadão */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <User className="w-5 h-5 text-rosa-500" />
                        Dados do Solicitante
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nome Completo *
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    name="cidadao_nome"
                                    required
                                    value={formData.cidadao_nome}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-500"
                                />
                            </div>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Telefone / WhatsApp *
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="tel"
                                    name="cidadao_telefone"
                                    required
                                    value={formData.cidadao_telefone}
                                    onChange={handleInputChange}
                                    placeholder="(12) 99999-9999"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-500"
                                />
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                E-mail (Opcional)
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="email"
                                    name="cidadao_email"
                                    value={formData.cidadao_email}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Localização */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-rosa-500" />
                        Localização
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bairro *
                            </label>
                            <select
                                name="bairro"
                                required
                                value={formData.bairro}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-500"
                            >
                                <option value="">Selecione...</option>
                                {bairros.map(b => (
                                    <option key={b} value={b}>{b}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Endereço / Referência
                            </label>
                            <input
                                type="text"
                                name="endereco"
                                value={formData.endereco}
                                onChange={handleInputChange}
                                placeholder="Rua, número, ponto de referência..."
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-500"
                            />
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm text-center">
                        {error}
                    </div>
                )}

                <div className="flex items-center justify-end gap-4">
                    <Link
                        href="/admin/demandas"
                        className="px-6 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Salvando...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Salvar Demanda
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
