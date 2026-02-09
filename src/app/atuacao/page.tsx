"use client";

import { motion } from "framer-motion";
import {
    Heart,
    FileText,
    CheckCircle,
    Clock,
    Users,
    Scale,
    ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const projetos = [
    {
        titulo: "Lei de Proteção à Mulher",
        status: "aprovado",
        descricao: "Projeto que amplia a rede de proteção às mulheres vítimas de violência doméstica no município.",
        data: "15/01/2024",
    },
    {
        titulo: "Programa Saúde em Foco",
        status: "em_tramitacao",
        descricao: "Criação de mutirões de saúde nos bairros periféricos com atendimento gratuito.",
        data: "22/02/2024",
    },
    {
        titulo: "Iluminação para Todos",
        status: "aprovado",
        descricao: "Projeto que determina prazos máximos para conserto de iluminação pública.",
        data: "10/03/2024",
    },
    {
        titulo: "Escola Acessível",
        status: "em_tramitacao",
        descricao: "Adequação de todas as escolas municipais às normas de acessibilidade.",
        data: "05/04/2024",
    },
    {
        titulo: "Transparência Digital",
        status: "aprovado",
        descricao: "Obrigatoriedade de publicação de gastos públicos em tempo real.",
        data: "18/05/2024",
    },
];

const indicadores = [
    {
        valor: "47",
        label: "Projetos de Lei",
        descricao: "Propostas apresentadas",
    },
    {
        valor: "23",
        label: "Aprovados",
        descricao: "Projetos aprovados",
    },
    {
        valor: "15",
        label: "Em Tramitação",
        descricao: "Aguardando votação",
    },
    {
        valor: "57",
        label: "Requerimentos",
        descricao: "Solicitações à prefeitura",
    },
];

const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
        aprovado: "bg-green-100 text-green-700",
        em_tramitacao: "bg-yellow-100 text-yellow-700",
        arquivado: "bg-gray-100 text-gray-600",
    };

    const labels = {
        aprovado: "Aprovado",
        em_tramitacao: "Em Tramitação",
        arquivado: "Arquivado",
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
            {labels[status as keyof typeof labels]}
        </span>
    );
};

export default function AtuacaoPage() {
    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-rosa-100 via-white to-rosa-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern-hearts opacity-30" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <span className="inline-flex items-center gap-2 text-rosa-600 font-medium mb-4">
                            <Heart className="w-5 h-5 fill-rosa-500" />
                            Atuação Legislativa
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                            Trabalhando por{" "}
                            <span className="gradient-text-rosa">você</span>
                        </h1>
                        <p className="text-lg text-gray-600">
                            Conheça os projetos de lei, requerimentos e indicações apresentados
                            em defesa da nossa comunidade.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 bg-white border-b border-rosa-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {indicadores.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <p className="text-4xl font-bold gradient-text-rosa">{item.valor}</p>
                                <p className="text-gray-900 font-semibold">{item.label}</p>
                                <p className="text-sm text-gray-500">{item.descricao}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projetos */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Projetos de <span className="gradient-text-rosa">Lei</span>
                        </h2>
                        <p className="text-gray-600">
                            Propostas que fazem a diferença na vida da população
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {projetos.map((projeto, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card p-6 hover:shadow-xl transition-all"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <FileText className="w-5 h-5 text-rosa-600" />
                                            <h3 className="text-lg font-bold text-gray-900">
                                                {projeto.titulo}
                                            </h3>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-3">
                                            {projeto.descricao}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {projeto.data}
                                            </span>
                                        </div>
                                    </div>
                                    <StatusBadge status={projeto.status} />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <a
                            href="https://www.camaradecaraguatatuba.sp.gov.br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary"
                        >
                            Ver todos no site da Câmara
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-rosa-600 to-rosa-500">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Heart className="w-12 h-12 text-white mx-auto mb-4 fill-white/50" />
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Tem uma sugestão de projeto?
                    </h2>
                    <p className="text-rosa-100 mb-8 max-w-2xl mx-auto">
                        Sua participação é fundamental! Envie suas ideias e ajude a construir
                        uma cidade melhor para todos.
                    </p>
                    <Link href="/#gabinete-digital" className="btn-psd">
                        <Heart className="w-5 h-5" />
                        Enviar Sugestão
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
