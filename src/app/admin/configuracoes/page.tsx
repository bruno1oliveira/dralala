"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Heart,
    Settings,
    Globe,
    Palette,
    Bell,
    Lock,
    Image,
    Save,
    Instagram,
    Facebook,
    Youtube,
    Phone,
    Mail,
    MapPin,
} from "lucide-react";

const tabs = [
    { id: "geral", label: "Geral", icon: Settings },
    { id: "aparencia", label: "Aparência", icon: Palette },
    { id: "redes", label: "Redes Sociais", icon: Globe },
    { id: "notificacoes", label: "Notificações", icon: Bell },
    { id: "seguranca", label: "Segurança", icon: Lock },
];

export default function ConfiguracoesPage() {
    const [activeTab, setActiveTab] = useState("geral");
    const [saving, setSaving] = useState(false);

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => setSaving(false), 1500);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
                    <p className="text-gray-500">Gerencie as configurações do site</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn-primary"
                >
                    <Save className="w-4 h-4" />
                    {saving ? "Salvando..." : "Salvar Alterações"}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${activeTab === tab.id
                                ? "bg-rosa-100 text-rosa-700"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-gray-100 p-6"
            >
                {activeTab === "geral" && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">
                            Informações Gerais
                        </h2>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nome do Gabinete
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Gabinete Vereadora Dra. Lalá"
                                    className="input-rosa"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Partido
                                </label>
                                <input
                                    type="text"
                                    defaultValue="PSD"
                                    className="input-rosa"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cidade
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Caraguatatuba"
                                    className="input-rosa"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Estado
                                </label>
                                <input
                                    type="text"
                                    defaultValue="SP"
                                    className="input-rosa"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Descrição do Site
                            </label>
                            <textarea
                                defaultValue="Plataforma digital do Gabinete da Vereadora Dra. Lalá - PSD. Advogada comprometida com a justiça social."
                                rows={3}
                                className="input-rosa resize-none"
                            />
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <h3 className="text-md font-semibold text-gray-900 mb-4">
                                Contato do Gabinete
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        <Phone className="w-4 h-4" />
                                        Telefone
                                    </label>
                                    <input
                                        type="tel"
                                        defaultValue="(12) 3999-9999"
                                        className="input-rosa"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        <Phone className="w-4 h-4" />
                                        WhatsApp
                                    </label>
                                    <input
                                        type="tel"
                                        defaultValue="(12) 99999-9999"
                                        className="input-rosa"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        <Mail className="w-4 h-4" />
                                        E-mail
                                    </label>
                                    <input
                                        type="email"
                                        defaultValue="gabinete@dralala.com.br"
                                        className="input-rosa"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        <MapPin className="w-4 h-4" />
                                        Endereço
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Rua Example, 123 - Centro"
                                        className="input-rosa"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "aparencia" && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">
                            Aparência do Site
                        </h2>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cor Primária
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        defaultValue="#db2777"
                                        className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        defaultValue="#db2777"
                                        className="input-rosa flex-1"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cor Secundária
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        defaultValue="#D4AF37"
                                        className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        defaultValue="#D4AF37"
                                        className="input-rosa flex-1"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <h3 className="text-md font-semibold text-gray-900 mb-4">
                                Imagens
                            </h3>
                            <div className="grid sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Logo
                                    </label>
                                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-rosa-400 transition-colors cursor-pointer">
                                        <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">Clique para enviar</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Foto Principal
                                    </label>
                                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-rosa-400 transition-colors cursor-pointer">
                                        <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">Clique para enviar</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Favicon
                                    </label>
                                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-rosa-400 transition-colors cursor-pointer">
                                        <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">Clique para enviar</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "redes" && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">
                            Redes Sociais
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Instagram className="w-4 h-4" />
                                    Instagram
                                </label>
                                <input
                                    type="url"
                                    defaultValue="https://instagram.com/lalavereadora"
                                    className="input-rosa"
                                    placeholder="https://instagram.com/seu_usuario"
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Facebook className="w-4 h-4" />
                                    Facebook
                                </label>
                                <input
                                    type="url"
                                    defaultValue="https://facebook.com/lalavereadora"
                                    className="input-rosa"
                                    placeholder="https://facebook.com/sua_pagina"
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Youtube className="w-4 h-4" />
                                    YouTube
                                </label>
                                <input
                                    type="url"
                                    defaultValue="https://youtube.com/@lalavereadora"
                                    className="input-rosa"
                                    placeholder="https://youtube.com/@seu_canal"
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Phone className="w-4 h-4" />
                                    WhatsApp (link direto)
                                </label>
                                <input
                                    type="url"
                                    defaultValue="https://wa.me/5512999999999"
                                    className="input-rosa"
                                    placeholder="https://wa.me/5512999999999"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "notificacoes" && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">
                            Configurações de Notificações
                        </h2>

                        <div className="space-y-4">
                            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100">
                                <div>
                                    <p className="font-medium text-gray-900">Novas Demandas</p>
                                    <p className="text-sm text-gray-500">
                                        Receber notificação quando uma nova demanda for registrada
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="w-5 h-5 text-rosa-600 rounded focus:ring-rosa-500"
                                />
                            </label>

                            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100">
                                <div>
                                    <p className="font-medium text-gray-900">Novos Contatos</p>
                                    <p className="text-sm text-gray-500">
                                        Receber notificação quando um novo contato for adicionado
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="w-5 h-5 text-rosa-600 rounded focus:ring-rosa-500"
                                />
                            </label>

                            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100">
                                <div>
                                    <p className="font-medium text-gray-900">Aprovações Pendentes</p>
                                    <p className="text-sm text-gray-500">
                                        Receber notificação sobre itens aguardando aprovação
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="w-5 h-5 text-rosa-600 rounded focus:ring-rosa-500"
                                />
                            </label>

                            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100">
                                <div>
                                    <p className="font-medium text-gray-900">E-mail Diário</p>
                                    <p className="text-sm text-gray-500">
                                        Receber resumo diário das atividades do gabinete
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 text-rosa-600 rounded focus:ring-rosa-500"
                                />
                            </label>
                        </div>
                    </div>
                )}

                {activeTab === "seguranca" && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">
                            Segurança da Conta
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    E-mail de login
                                </label>
                                <input
                                    type="email"
                                    defaultValue="dralala@gabinete.com.br"
                                    className="input-rosa"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Senha atual
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="input-rosa"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nova senha
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="input-rosa"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirmar nova senha
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="input-rosa"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button className="btn-secondary">
                                <Lock className="w-4 h-4" />
                                Alterar Senha
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
