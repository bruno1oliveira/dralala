"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Save,
    Type,
    Link as LinkIcon,
    FileText,
    Image as ImageIcon,
    Tag,
    User,
    Loader2,
    Eye,
} from "lucide-react";
import Link from "next/link";
import { createNoticia } from "@/lib/api/noticias";
import { NoticiaStatus } from "@/types/database.types";

const categorias = [
    "Geral",
    "Saúde",
    "Educação",
    "Segurança",
    "Meio Ambiente",
    "Cultura",
    "Esporte",
    "Infraestrutura",
    "Social",
];

export default function NovaNoticiaPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        titulo: "",
        slug: "",
        resumo: "",
        conteudo: "",
        imagem_url: "",
        categoria: "Geral",
        status: "rascunho" as NoticiaStatus,
        autor: "Assessoria",
    });

    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

    // Função simples para gerar slug (similar ao backend, para feedback visual)
    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    useEffect(() => {
        if (!slugManuallyEdited) {
            setFormData((prev) => ({ ...prev, slug: generateSlug(prev.titulo) }));
        }
    }, [formData.titulo, slugManuallyEdited]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "slug") {
            setSlugManuallyEdited(true);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await createNoticia({
                ...formData,
                imagem_url: formData.imagem_url || null,
            });

            router.push("/admin/noticias");
            router.refresh();
        } catch (err: any) {
            console.error("Erro ao criar notícia:", err);
            // Tratamento básico de erro de unicidade do slug
            if (err.message && err.message.includes("slug")) {
                setError("Este slug já existe. Por favor, escolha outro.");
            } else {
                setError("Erro ao criar notícia. Verifique os dados e tente novamente.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/noticias"
                    className="p-2 hover:bg-white rounded-lg transition-colors text-gray-500"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Nova Notícia</h1>
                    <p className="text-gray-500">Crie e publique novos conteúdos</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Coluna Principal */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Conteúdo Principal */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-rosa-500" />
                                Conteúdo
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Título *
                                    </label>
                                    <div className="relative">
                                        <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            name="titulo"
                                            required
                                            value={formData.titulo}
                                            onChange={handleInputChange}
                                            placeholder="Título da notícia"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-500 font-medium text-lg"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Slug (URL Amigável) *
                                    </label>
                                    <div className="relative">
                                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            name="slug"
                                            required
                                            value={formData.slug}
                                            onChange={handleInputChange}
                                            placeholder="titulo-da-noticia"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-500 text-sm text-gray-600 bg-gray-50"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 pl-1">
                                        Endereço da notícia: /noticias/{formData.slug || "..."}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Resumo *
                                    </label>
                                    <textarea
                                        name="resumo"
                                        required
                                        rows={3}
                                        value={formData.resumo}
                                        onChange={handleInputChange}
                                        placeholder="Breve descrição que aparecerá nos cards de notícia..."
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-500 resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Conteúdo Completo *
                                    </label>
                                    <textarea
                                        name="conteudo"
                                        required
                                        rows={12}
                                        value={formData.conteudo}
                                        onChange={handleInputChange}
                                        placeholder="Escreva o conteúdo da notícia aqui..."
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-500 resize-y font-mono text-sm"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Suporta formatação Markdown básica.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Imagem */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-rosa-500" />
                                Imagem de Capa
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        URL da Imagem
                                    </label>
                                    <input
                                        type="url"
                                        name="imagem_url"
                                        value={formData.imagem_url}
                                        onChange={handleInputChange}
                                        placeholder="https://exemplo.com/imagem.jpg"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-500"
                                    />
                                </div>

                                {formData.imagem_url && (
                                    <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={formData.imagem_url}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src =
                                                    "https://placehold.co/600x400?text=Erro+na+Imagem";
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Configurações de Publicação */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <Eye className="w-5 h-5 text-rosa-500" />
                                Publicação
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-500 bg-white"
                                    >
                                        <option value="rascunho">Rascunho</option>
                                        <option value="pendente_aprovacao">Pendente Aprovação</option>
                                        <option value="publicada">Publicada</option>
                                        <option value="arquivada">Arquivada</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Categoria
                                    </label>
                                    <div className="relative">
                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <select
                                            name="categoria"
                                            value={formData.categoria}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-500 bg-white"
                                        >
                                            {categorias.map((cat) => (
                                                <option key={cat} value={cat}>
                                                    {cat}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Autor
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            name="autor"
                                            value={formData.autor}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rosa-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            {error && (
                                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm text-center">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Salvando...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Salvar Notícia
                                    </>
                                )}
                            </button>

                            <Link
                                href="/admin/noticias"
                                className="w-full flex items-center justify-center gap-2 px-6 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
