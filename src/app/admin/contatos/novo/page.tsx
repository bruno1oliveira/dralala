"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Save,
    User,
    Phone,
    Mail,
    MapPin,
    Tag,
    Loader2,
    Star,
} from "lucide-react";
import Link from "next/link";
import { createContato } from "@/lib/api/contatos";

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

const commonTags = [
    "Líder Comunitário",
    "Comerciante",
    "Saúde",
    "Educação",
    "Religioso",
    "Apoiador",
    "Voluntário"
];

export default function NovoContatoPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        nome: "",
        telefone: "",
        email: "",
        bairro: "",
        is_apoiador: false,
        tags: [] as string[],
        notas: "",
    });

    const [newTag, setNewTag] = useState("");

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const toggleTag = (tag: string) => {
        setFormData(prev => {
            if (prev.tags.includes(tag)) {
                return { ...prev, tags: prev.tags.filter(t => t !== tag) };
            } else {
                return { ...prev, tags: [...prev.tags, tag] };
            }
        });
    };

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && newTag.trim()) {
            e.preventDefault();
            if (!formData.tags.includes(newTag.trim())) {
                setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
            }
            setNewTag("");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await createContato({
                ...formData,
                email: formData.email || null,
                notas: formData.notas || null,
            });

            router.push("/admin/contatos");
            router.refresh();
        } catch (err) {
            console.error("Erro ao criar contato:", err);
            setError("Erro ao criar contato. Verifique os dados e tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/contatos"
                    className="p-2 hover:bg-white rounded-lg transition-colors text-gray-500"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Novo Contato</h1>
                    <p className="text-gray-500">Adicione um novo contato à sua base</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <User className="w-5 h-5 text-rosa-500" />
                        Informações Pessoais
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nome Completo *
                            </label>
                            <input
                                type="text"
                                name="nome"
                                required
                                value={formData.nome}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-500"
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Telefone *
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="tel"
                                    name="telefone"
                                    required
                                    value={formData.telefone}
                                    onChange={handleInputChange}
                                    placeholder="(12) 99999-9999"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-500"
                                />
                            </div>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                E-mail
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-500"
                                />
                            </div>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bairro *
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <select
                                    name="bairro"
                                    required
                                    value={formData.bairro}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-500 appearance-none bg-white"
                                >
                                    <option value="">Selecione...</option>
                                    {bairros.map(b => (
                                        <option key={b} value={b}>{b}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-span-2 md:col-span-1 flex items-center h-full pt-6">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${formData.is_apoiador ? 'bg-rosa-500 border-rosa-500' : 'border-gray-300 bg-white'}`}>
                                    {formData.is_apoiador && <Star className="w-4 h-4 text-white" />}
                                </div>
                                <input
                                    type="checkbox"
                                    name="is_apoiador"
                                    checked={formData.is_apoiador}
                                    onChange={handleInputChange}
                                    className="hidden"
                                />
                                <span className="text-sm font-medium text-gray-700">Marcar como Apoiador</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Tag className="w-5 h-5 text-rosa-500" />
                        Tags e Notas
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tags
                            </label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {commonTags.map(tag => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => toggleTag(tag)}
                                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${formData.tags.includes(tag)
                                                ? "bg-rosa-100 text-rosa-700 border border-rosa-200"
                                                : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="text"
                                placeholder="Adicionar tag personalizada (Pressione Enter)"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyDown={handleAddTag}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-500 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Notas / Observações
                            </label>
                            <textarea
                                name="notas"
                                rows={3}
                                value={formData.notas}
                                onChange={handleInputChange}
                                placeholder="Informações adicionais sobre o contato..."
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-500 resize-none"
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
                        href="/admin/contatos"
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
                                Salvar Contato
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
